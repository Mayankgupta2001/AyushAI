import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { condition, prakriti } = await req.json();

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an Ayurvedic expert. Reply ONLY in valid JSON:
{
  condition: string,
  ayurvedicView: string (dosha explanation in Hindi),
  remedies: [{name: string, ingredients: [array], preparation: string, dosage: string, duration: string, precautions: string}],
  yogaAsanas: [array of 3],
  dietDo: [array of 4 in Hindi],
  dietDontDo: [array of 4 in Hindi],
  disclaimer: string in Hindi
}`,
        },
        {
          role: 'user',
          content: `Condition: ${condition}, Prakriti: ${prakriti}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const rawText = response.choices[0]?.message?.content || "";

    if (!rawText) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    // Strip markdown code blocks if present
    const cleaned = rawText
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/gi, '')
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(parsed);
    } catch {
      // Try to extract JSON object from text
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json(parsed);
        } catch {
          return NextResponse.json({ error: "Parse failed", raw: cleaned }, { status: 500 });
        }
      }
      return NextResponse.json({ error: "No JSON found", raw: cleaned }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in remedy API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}