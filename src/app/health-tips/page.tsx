"use client";

import { useState, useEffect } from 'react';

interface HealthTip {
  tip: string;
  category: 'diet' | 'exercise' | 'sleep' | 'mental' | 'ayurveda';
  ayurvedicAngle: string;
  modernAngle: string;
  quickAction: string;
}

const staticTips: HealthTip[] = [
  {
    tip: "Subah uthke khali pet ek glass garam paani mein adha nimbu nichod ke piyo",
    category: "ayurveda",
    ayurvedicAngle: "Ama (toxins) saaf karta hai",
    modernAngle: "Metabolism boost karta hai, Vitamin C milta hai",
    quickAction: "Kal subah se shuru karo"
  },
  {
    tip: "Raat ko sone se 2 ghante pehle khana kha lo",
    category: "diet",
    ayurvedicAngle: "Pitta dosha balance rehta hai",
    modernAngle: "Better digestion aur deep sleep milti hai",
    quickAction: "Aaj raat try karo"
  },
  {
    tip: "Roz 10 minute Anulom Vilom pranayama karo",
    category: "exercise",
    ayurvedicAngle: "Vata-Pitta-Kapha teeno balance hote hain",
    modernAngle: "Blood pressure kam hota hai, oxygen better hoti hai",
    quickAction: "Abhi 5 minute karo"
  },
  {
    tip: "Haldi wala doodh raat ko piyo",
    category: "ayurveda",
    ayurvedicAngle: "Rasayana hai, immunity badhata hai",
    modernAngle: "Curcumin anti-inflammatory hai",
    quickAction: "Aaj raat piyo"
  },
  {
    tip: "Phone screen se 1 ghante pehle door raho sone se",
    category: "sleep",
    ayurvedicAngle: "Vata shant hota hai",
    modernAngle: "Melatonin production better hoti hai",
    quickAction: "Aaj raat se try karo"
  },
  {
    tip: "Din mein 8-10 glass paani piyo, plastic bottle se nahi",
    category: "diet",
    ayurvedicAngle: "Tridosha balance, toxins flush hote hain",
    modernAngle: "Kidney function better, skin glow karta hai",
    quickAction: "Abhi ek glass piyo"
  },
  {
    tip: "Subah 20 minute walk zaroor karo, shoes pehen ke",
    category: "exercise",
    ayurvedicAngle: "Praan vayu milti hai, agni tej hoti hai",
    modernAngle: "Heart health, mood better hota hai",
    quickAction: "Kal subah alarm lagao"
  },
  {
    tip: "Roz 5 minute gratitude journal likho",
    category: "mental",
    ayurvedicAngle: "Mana prasanna hota hai, Sattva badhta hai",
    modernAngle: "Cortisol kam hota hai, mental health better",
    quickAction: "Aaj raat 3 cheez likho jo achhi lagin"
  }
];

const categoryEmojis: Record<string, string> = {
  diet: '🥗',
  exercise: '🏃',
  sleep: '😴',
  mental: '🧠',
  ayurveda: '🌿'
};

const categoryLabels: Record<string, string> = {
  all: 'All',
  diet: '🥗 Diet',
  exercise: '🏃 Exercise',
  sleep: '😴 Sleep',
  mental: '🧠 Mental',
  ayurveda: '🌿 Ayurveda'
};

export default function HealthTipsPage() {
  const [tip, setTip] = useState<HealthTip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchTip = async () => {
    setLoading(true);
    setError(null);
    setTip(null);
    try {
      const timestamp = Date.now();
      const res = await fetch(`/api/health-tip?t=${timestamp}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const safeData: HealthTip = {
        tip: data.tip ?? 'Roz subah garam paani piyo',
        category: data.category ?? 'ayurveda',
        ayurvedicAngle: data.ayurvedicAngle ?? 'Prakriti ke anusar laabhdayak hai',
        modernAngle: data.modernAngle ?? 'Scientific research se proven hai',
        quickAction: data.quickAction ?? 'Aaj se shuru karo'
      };
      setTip(safeData);
    } catch (err) {
      console.error('Health tip fetch error:', err);
      setError('Tip load nahi hui, dobara try karo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  const filteredTips = activeCategory === 'all'
    ? staticTips
    : staticTips.filter(t => t.category === activeCategory);

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      diet: 'bg-green-100 text-green-800',
      exercise: 'bg-blue-100 text-blue-800',
      sleep: 'bg-purple-100 text-purple-800',
      mental: 'bg-pink-100 text-pink-800',
      ayurveda: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">📋 Daily Health Tips</h1>
          <p className="text-green-100 text-lg">Roz ek nayi Ayurvedic + Modern health tip</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              ✨ Aaj Ki Tip — AI Generated
            </span>
            <button
              onClick={fetchTip}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
            >
              {loading ? '⏳ Load ho raha hai...' : '🔄 Nayi Tip Lao'}
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
              <p className="text-gray-500 text-sm">AI tip generate kar raha hai...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={fetchTip} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                🔄 Dobara Try Karo
              </button>
            </div>
          ) : tip ? (
            <div className="space-y-6">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">{tip.tip}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">🌿 Ayurvedic Angle</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip.ayurvedicAngle}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">🔬 Modern Science</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip.modernAngle}</p>
                </div>
              </div>
              <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">⚡ Quick Action: {tip.quickAction}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(tip.category ?? 'ayurveda')}`}>
                {tip.category
                  ? `${categoryEmojis[tip.category] ?? '📋'} ${tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}`
                  : '📋 General'}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTips.map((staticTip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(staticTip.category)}`}>
                  {categoryEmojis[staticTip.category]} {staticTip.category.charAt(0).toUpperCase() + staticTip.category.slice(1)}
                </span>
              </div>
              <p className="text-gray-800 font-medium mb-4 leading-relaxed">{staticTip.tip}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">🌿</span>
                  <span className="text-gray-600">{staticTip.ayurvedicAngle}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">🔬</span>
                  <span className="text-gray-600">{staticTip.modernAngle}</span>
                </div>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm font-semibold">⚡ {staticTip.quickAction}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-800 text-white rounded-lg p-8 text-center">
          <p className="text-2xl font-bold mb-2">स्वस्थस्य स्वास्थ्य रक्षणम्</p>
          <p className="text-green-100">Swasth vyakti ka swasthya raksha karna — Ayurveda ka pehla siddhant</p>
        </div>
      </div>
    </div>
  );
}