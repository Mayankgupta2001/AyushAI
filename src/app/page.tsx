"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const symptomChips = [
  'Bukhar',
  'Sar Dard',
  'Khansi',
  'Pet Dard',
  'Thakan',
  'Chakkar',
];

const featureCards = [
  {
    icon: '🔍',
    title: 'Symptom Checker',
    description: 'AI se symptoms analyze karein, Ayurvedic + Modern dono solution paayein',
    href: '/symptom-checker',
  },
  {
    icon: '🌿',
    title: 'Ayurvedic Remedies',
    description: 'Ghar ke nuskhe, Dosha analysis, Herbal solutions',
    href: '/remedies',
  },
  {
    icon: '💊',
    title: 'Medicine Info',
    description: 'Kisi bhi medicine ke side effects Hindi mein jaanein',
    href: '/medicines',
  },
  {
    icon: '🏥',
    title: 'Free Clinics',
    description: 'Nearest government clinic, Jan Aushadhi, PHC dhundho',
    href: '/clinics',
  },
  {
    icon: '📋',
    title: 'Daily Health Tips',
    description: 'Roz ek nayi Ayurvedic + Modern health tip',
    href: '/health-tips',
  },
  {
    icon: '🛡️',
    title: 'Safe & Free',
    description: 'Koi registration nahi, koi fee nahi, hamesha free',
    href: '/',
  },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/symptom-checker?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleChipClick = (chip: string) => {
    router.push(`/symptom-checker?q=${encodeURIComponent(chip)}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d4f3c] to-[#1a7a5e] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center text-white">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20">
            🇮🇳 India&apos;s First Free Ayurveda + Modern Medicine AI
          </span>
          <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            आपका मुफ़्त स्वास्थ्य सहायक
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-200 sm:text-xl">
            Ayurveda + Modern Medicine — एक ही जगह, बिल्कुल मुफ़्त
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-10 w-full max-w-3xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="search" className="sr-only">
                Symptom likho
              </label>
              <input
                id="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Symptom likho... jaise bukhar, sar dard, pet dard"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/40"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                जाँच करें →
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {symptomChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/20"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 text-center sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">1000+ Ayurvedic Herbs</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Hindi Mein Jawab</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">100% Free Forever</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-emerald-600">Features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Health tools that work together
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <button
                key={feature.title}
                type="button"
                onClick={() => router.push(feature.href)}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-left transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-200 bg-[#ebf8f2] px-6 py-10 text-center shadow-sm sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">How it works</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl bg-white px-5 py-6 text-left shadow-sm">
              <p className="text-lg font-semibold text-slate-900">1. Symptom likho</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-6 text-left shadow-sm">
              <p className="text-lg font-semibold text-slate-900">2. AI analyze karta hai</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-6 text-left shadow-sm">
              <p className="text-lg font-semibold text-slate-900">3. Ayurvedic + Modern solution paao</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-amber-300 bg-amber-50 px-6 py-8 text-center shadow-sm sm:px-10">
          <p className="text-base font-semibold text-amber-800">⚠️ AyushAI sirf jaankari ke liye hai. Yeh doctor ki jagah nahi le sakta. Gambhir bimari mein turant doctor se milein.</p>
        </div>
      </section>
    </div>
  );
}
