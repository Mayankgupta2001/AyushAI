"use client";

import { useState } from 'react';

interface Remedy {
  name: string;
  ingredients: string[];
  preparation: string;
  dosage: string;
  duration: string;
  precautions: string;
}

interface RemedyResult {
  condition: string;
  ayurvedicView: string;
  remedies: Remedy[];
  yogaAsanas: string[];
  dietDo: string[];
  dietDontDo: string[];
  disclaimer: string;
}

const commonConditions = [
  'Diabetes', 'High BP', 'Acidity', 'Arthritis', 'Anxiety',
  'Insomnia', 'Weight Loss', 'Hair Fall', 'Skin Problems', 'Cold & Cough',
  'Digestion', 'Stress'
];

const prakritiOptions = ['Vata', 'Pitta', 'Kapha', 'Pata Nahi'];

export default function RemediesPage() {
  const [condition, setCondition] = useState('');
  const [prakriti, setPrakriti] = useState('unknown');
  const [result, setResult] = useState<RemedyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!condition.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/remedy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition, prakriti }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleConditionChip = (cond: string) => {
    setCondition(cond);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">🌿 Ayurvedic Remedies</h1>
          <p className="text-green-100 text-lg">Prakriti ke anusar ghar ke nuskhe aur Ayurvedic upchar</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Input Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Condition Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Bimari ya problem batao
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Jaise: Diabetes, Acidity, Hair Fall, Anxiety..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Condition Chips */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Ya yeh se ek chunein:</p>
              <div className="flex flex-wrap gap-2">
                {commonConditions.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => handleConditionChip(cond)}
                    className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Prakriti Selector */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Aapki Prakriti
              </label>
              <div className="flex flex-wrap gap-3">
                {prakritiOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="prakriti"
                      value={option === 'Pata Nahi' ? 'unknown' : option.toLowerCase()}
                      checked={prakriti === (option === 'Pata Nahi' ? 'unknown' : option.toLowerCase())}
                      onChange={(e) => setPrakriti(e.target.value)}
                      className="sr-only"
                    />
                    <span className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      prakriti === (option === 'Pata Nahi' ? 'unknown' : option.toLowerCase())
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Ayurvedic upchar dhundh raha hai... 🙏' : '🌿 Ayurvedic Upchar Jaanein'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Ayurvedic View Card */}
            <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-3">🔮 Ayurvedic Drishtikon</h2>
              <p className="text-gray-700 leading-relaxed">{result.ayurvedicView}</p>
            </div>

            {/* Remedy Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">🌿 Ayurvedic Nuskhe</h2>
              {result.remedies?.map((remedy, index) => (
                <div key={index} className="bg-white border border-green-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">🌿 {remedy.name}</h3>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Saman:</h4>
                    <div className="flex flex-wrap gap-2">
                      {remedy.ingredients?.map((ing, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preparation */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Kaise Banayein:</h4>
                    <p className="text-gray-600">{remedy.preparation}</p>
                  </div>

                  {/* Dosage and Duration */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-green-100 px-3 py-2 rounded-lg">
                      <span className="font-semibold text-green-800">Kitna Lein:</span> {remedy.dosage}
                    </div>
                    <div className="bg-blue-100 px-3 py-2 rounded-lg">
                      <span className="font-semibold text-blue-800">Kitne Din:</span> {remedy.duration}
                    </div>
                  </div>

                  {/* Precautions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Savdhani:</h4>
                    <p className="text-yellow-700">{remedy.precautions}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Yoga Section */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">🧘 Yoga Asanas</h2>
              <div className="flex flex-wrap gap-2">
                {result.yogaAsanas?.map((asana, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                    {asana}
                  </span>
                ))}
              </div>
            </div>

            {/* Diet Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Diet Do */}
                <div className="bg-green-50 p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-4">✅ Kya Khaayein</h2>
                  <ul className="space-y-2">
                    {result.dietDo?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diet Don't */}
                <div className="bg-red-50 p-6">
                  <h2 className="text-xl font-bold text-red-800 mb-4">❌ Kya Na Khaayein</h2>
                  <ul className="space-y-2">
                    {result.dietDontDo?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-amber-800 text-sm leading-relaxed">{result.disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}