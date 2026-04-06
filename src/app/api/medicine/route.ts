import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { medicineName } = await req.json();

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are AyushAI medicine expert. Given a medicine name, reply ONLY in valid JSON:
{
  medicineName: string,
  hindiName: string,
  usedFor: [array in Hindi],
  howItWorks: string in simple Hindi,
  sideEffects: { common: [array], serious: [array], rare: [array] },
  warnings: [array in Hindi],
  doNotTakeWith: [array],
  ayurvedicAlternative: { name: string, benefit: string } or null,
  dosageNote: string in Hindi,
  disclaimer: string in Hindi
}`,
        },
        {
          role: 'user',
          content: `Medicine: ${medicineName}`,
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
    console.error('Error in medicine API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}