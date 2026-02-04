import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Parser from 'rss-parser';

const prisma = new PrismaClient();
const parser = new Parser();

export async function GET() {
    try {
          // Get all sources from the database
      const sources = await prisma.source.findMany();

      if (sources.length === 0) {
              return NextResponse.json(
                { error: 'No sources configured. Please run the seed script first.' },
                { status: 400 }
                      );
      }

      const results = {
              success: [] as string[],
              errors: [] as string[],
              articlesCreated: 0,
      };

      // Process each source
      for (const source of sources) {
              try {
                        const feed = await parser.parseURL(source.url);

                for (const item of feed.items.slice(0, 10)) {
                            // Skip if no link
                          if (!item.link) continue;

                          try {
                                        // Try to create the article (skip if URL already exists)
                              await prisma.article.upsert({
                                              where: { url: item.link },
                                              update: {},
                                              create: {
                                                                sourceId: source.id,
                                                                title: item.title || 'Untitled',
                                                                url: item.link,
                                                                publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                                                                snippet: item.contentSnippet || item.content?.substring(0, 500) || null,
                                              },
                              });
                                        results.articlesCreated++;
                          } catch (articleError) {
                                        // Article might already exist, continue
                          }
                }

                results.success.push(source.name);
              } catch (sourceError) {
                        results.errors.push(`${source.name}: ${sourceError instanceof Error ? sourceError.message : 'Unknown error'}`);
              }
      }

      return NextResponse.json({
              message: 'Ingestion completed',
              sourcesProcessed: results.success.length,
              sourcesFailed: results.errors.length,
              articlesCreated: results.articlesCreated,
              details: results,
      });
    } catch (error) {
          console.error('Ingestion error:', error);
          return NextResponse.json(
            { error: 'Failed to run ingestion' },
            { status: 500 }
                );
    } finally {
          await prisma.$disconnect();
    }
}

export async function POST() {
    // POST also triggers ingestion
  return GET();
}
