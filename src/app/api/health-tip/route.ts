import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Give a unique health tip. Current time: ${Date.now()}. Make it different from common tips. Reply ONLY in valid JSON:
{
  tip: string (2-3 sentences in Hindi),
  category: diet or exercise or sleep or mental or ayurveda,
  ayurvedicAngle: string in Hindi,
  modernAngle: string in Hindi,
  quickAction: string (ek kaam jo aaj se shuru kar sako)
}`,
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
    console.error('Error in health-tip API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}