import { z } from "zod";
import { OpenAI } from "openai";
import {
  SEGMENTS,
  OPERATOR_FUNCTIONS,
  OPERATIONAL_THEMES,
  IMPACT_AREAS,
  GEOGRAPHY,
  TIME_HORIZON,
  CONFIDENCE,
  SENTIMENT
} from "./vocab";

export const EnrichmentSchema = z.object({
  what_happened: z.string(),
  why_it_matters_operator: z.string(),
  impact_areas: z.array(z.enum(IMPACT_AREAS)),
  segments: z.array(z.enum(SEGMENTS)),
  operator_functions: z.array(z.enum(OPERATOR_FUNCTIONS)),
  operational_themes: z.array(z.enum(OPERATIONAL_THEMES)),
  geography: z.array(z.enum(GEOGRAPHY)),
  actions_to_consider: z.array(z.string()).length(3),
  time_horizon: z.enum(TIME_HORIZON),
  impact_score: z.number().min(1).max(5),
  confidence: z.enum(CONFIDENCE),
  sentiment: z.enum(SENTIMENT),
  entities: z.array(z.string())
});

export type Enrichment = z.infer<typeof EnrichmentSchema>;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function enrichArticle({
  title,
  snippet,
  rawText,
  worldview
}: {
  title: string;
  snippet: string | null;
  rawText: string;
  worldview: string;
}): Promise<Enrichment | null> {
  const prompt = buildPrompt({ title, snippet, rawText, worldview });

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  try {
    const response = await client.chat.completions.create({
      model,
      temperature: 0,
      messages: [{ role: "user", content: prompt }]
    });

    const text = response.choices[0]?.message?.content ?? "";
    const json = safeJsonParse(text);
    if (!json) return null;

    const parsed = EnrichmentSchema.safeParse(json);
    if (!parsed.success) return null;

    return parsed.data;
  } catch {
    return null;
  }
}

function buildPrompt({
  title,
  snippet,
  rawText,
  worldview
}: {
  title: string;
  snippet: string | null;
  rawText: string;
  worldview: string;
}) {
  return `
You are a retail operations analyst. Use the article to produce structured operator enrichment for worldview "${worldview}".

Controlled vocab:
Segments: ${JSON.stringify(SEGMENTS)}
Operator functions: ${JSON.stringify(OPERATOR_FUNCTIONS)}
Operational themes: ${JSON.stringify(OPERATIONAL_THEMES)}
Impact areas: ${JSON.stringify(IMPACT_AREAS)}
Geography: ${JSON.stringify(GEOGRAPHY)}
Time horizon: ${JSON.stringify(TIME_HORIZON)}
Confidence: ${JSON.stringify(CONFIDENCE)}
Sentiment: ${JSON.stringify(SENTIMENT)}

Rules:
- Do not invent facts. If unclear, use cautious framing and lower confidence.
- Use British English.
- Return only valid JSON, no markdown, no extra keys.

JSON schema:
{
  "what_happened": "string, 1 sentence",
  "why_it_matters_operator": "string, 1 sentence",
  "impact_areas": "array of Impact areas",
  "segments": "array of Segments",
  "operator_functions": "array of Operator functions",
  "operational_themes": "array of Operational themes",
  "geography": "array of Geography",
  "actions_to_consider": ["string", "string", "string"],
  "time_horizon": "now | next_quarter | next_year",
  "impact_score": "integer 1-5",
  "confidence": "high | medium | low",
  "sentiment": "positive | neutral | negative",
  "entities": ["string"]
}

Article:
Title: ${title}
Snippet: ${snippet ?? "None"}
Text: ${rawText.slice(0, 6000)}
`.trim();
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const sliced = text.slice(start, end + 1);
    try {
      return JSON.parse(sliced);
    } catch {
      return null;
    }
  }
}
