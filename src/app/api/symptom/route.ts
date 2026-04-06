import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { symptoms } = await req.json();

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are AyushAI, India's trusted free health assistant. User describes symptoms in Hindi or English. Reply ONLY in valid JSON format, no extra text:
{
  possibleConditions: [array of 2-3 conditions in Hindi],
  severity: mild or moderate or severe,
  ayurvedicRemedies: [{name: string, herb: string, howToUse: string, timing: string}],
  modernApproach: {commonMeds: [generic names only], whenToSeeDoctor: string},
  dietAdvice: [array of 3 tips in Hindi],
  doNotDo: [array of 3 things to avoid in Hindi],
  disclaimer: string in Hindi
}
Always respond in Hindi. For severe symptoms always recommend seeing a doctor immediately.`,
        },
        {
          role: 'user',
          content: `Mere symptoms: ${symptoms}`,
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
    console.error('Error in symptom API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}