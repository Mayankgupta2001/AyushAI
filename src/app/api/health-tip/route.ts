import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Force dynamic - Vercel cache disable karo
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const tipTopics = [
  "digestive health aur gut bacteria",
  "neend aur circadian rhythm",
  "stress management aur cortisol",
  "immunity boost karne ke tarike",
  "joints aur inflammation kam karna",
  "skin health andar se",
  "energy levels naturally badhana",
  "blood sugar balance rakhna",
  "hair aur nails ki sehat",
  "aankhon ki care",
  "liver detox natural tarike se",
  "dil ki sehat aur cholesterol",
];

export async function GET(req: NextRequest) {
  // Cache bypass headers
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  try {
    // Random topic choose karo har baar
    const randomTopic = tipTopics[Math.floor(Math.random() * tipTopics.length)];
    const timestamp = req.nextUrl.searchParams.get('t') || Date.now().toString();

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are AyushAI health expert. Always reply ONLY with valid JSON, no markdown, no extra text.',
        },
        {
          role: 'user',
          content: `Request ID: ${timestamp}. Topic: ${randomTopic}.
          
Give ONE unique health tip about this topic combining Ayurveda and modern science.
Reply ONLY in this exact JSON format with no extra text:
{
  "tip": "2-3 sentences in Hindi about ${randomTopic}",
  "category": "diet",
  "ayurvedicAngle": "Ayurvedic explanation in Hindi",
  "modernAngle": "Modern science explanation in Hindi", 
  "quickAction": "Ek simple action jo aaj se shuru kar sako"
}

category must be exactly one of: diet, exercise, sleep, mental, ayurveda`,
        },
      ],
      temperature: 0.9,
      max_tokens: 800,
    });

    const rawText = response.choices[0]?.message?.content || "";

    if (!rawText) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500, headers }
      );
    }

    // Strip markdown code blocks
    const cleaned = rawText
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/gi, '')
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      // Validate category field
      const validCategories = ['diet', 'exercise', 'sleep', 'mental', 'ayurveda'];
      if (!validCategories.includes(parsed.category)) {
        parsed.category = 'ayurveda';
      }
      return NextResponse.json(parsed, { headers });
    } catch {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json(parsed, { headers });
        } catch {
          return NextResponse.json(
            { error: 'Parse failed', raw: cleaned },
            { status: 500, headers }
          );
        }
      }
      return NextResponse.json(
        { error: 'No JSON found', raw: cleaned },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Health tip API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
}