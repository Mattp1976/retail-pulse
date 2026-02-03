import Parser from "rss-parser";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { prisma } from "./prisma";
import { enrichArticle } from "./enrichment";
import { Worldview } from "./vocab";

const parser = new Parser();

export async function ingestForWorldview(worldview: Worldview) {
  const sources = await prisma.source.findMany({ where: { worldview } });

  let created = 0;
  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of feed.items) {
        const url = item.link;
        if (!url || !item.title) continue;
        try {
          await prisma.article.create({
            data: {
              sourceId: source.id,
              title: item.title,
              url,
              publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
              snippet: item.contentSnippet ?? null
            }
          });
          created += 1;
        } catch {
          continue;
        }
      }
    } catch {
      continue;
    }
  }

  const unenriched = await prisma.article.findMany({
    where: {
      enrichedAt: null,
      source: { worldview }
    },
    orderBy: { publishedAt: "desc" },
    take: 10,
    include: { source: true }
  });

  let enriched = 0;

  for (const article of unenriched) {
    try {
      const rawText = await extractReadableText(article.url);
      if (!rawText) continue;
      const enrichment = await enrichArticle({
        title: article.title,
        snippet: article.snippet,
        rawText,
        worldview
      });
      if (!enrichment) continue;

      await prisma.article.update({
        where: { id: article.id },
        data: {
          rawText,
          enrichment,
          enrichedAt: new Date()
        }
      });
      enriched += 1;
    } catch {
      continue;
    }
  }

  return { created, enriched };
}

async function extractReadableText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return null;
    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    if (!article?.textContent) return null;
    return article.textContent;
  } catch {
    return null;
  }
}
