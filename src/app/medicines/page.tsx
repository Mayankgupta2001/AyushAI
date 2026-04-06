"use client";

import { useState } from "react";

interface AyurvedicAlternative {
  name: string;
  benefit: string;
}

interface SideEffects {
  common: string[];
  serious: string[];
  rare: string[];
}

interface MedicineResult {
  medicineName: string;
  hindiName: string;
  usedFor: string[];
  howItWorks: string;
  sideEffects: SideEffects;
  warnings: string[];
  doNotTakeWith: string[];
  ayurvedicAlternative: AyurvedicAlternative | null;
  dosageNote: string;
  disclaimer: string;
}

const commonMedicines = [
  "Paracetamol",
  "Ibuprofen",
  "Metformin",
  "Amoxicillin",
  "Pantoprazole",
  "Azithromycin",
  "Cetirizine",
  "Omeprazole",
  "Aspirin",
  "Dolo 650",
];

export default function MedicinesPage() {
  const [medicineName, setMedicineName] = useState("");
  const [result, setResult] = useState<MedicineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicineName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Kuch galat ho gaya.");
      }

      setResult(data as MedicineResult);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fillInput = (med: string) => {
    setMedicineName(med);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-3xl bg-[#0d4f3c] px-6 py-10 text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">💊 Medicine Information</h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base">
            Kisi bhi medicine ke baare mein Hindi mein jaanein — side effects, warnings, alternatives
          </p>
        </section>

        <main className="mt-8 space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Medicine ka naam likho</h2>
            <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700" htmlFor="medicine">
                Medicine name
              </label>
              <input
                id="medicine"
                type="text"
                value={medicineName}
                onChange={(event) => setMedicineName(event.target.value)}
                placeholder="Jaise: Paracetamol, Metformin, Amoxicillin..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Common medicines:</p>
                <div className="flex flex-wrap gap-2">
                  {commonMedicines.map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => fillInput(med)}
                      className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
              >
                {loading ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    Medicine ki jaankari dhundh raha hai...
                  </>
                ) : (
                  "🔍 Medicine Jaanein"
                )}
              </button>
            </form>
          </section>

          {result ? (
            <section className="space-y-6">
              <div className="rounded-3xl bg-[#0d4f3c] p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold">{result.medicineName ?? ''}</h2>
                <p className="mt-2 italic">{result.hindiName ?? ''}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium">Kaam karta hai:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(result.usedFor?.map((use) => (
                      <span
                        key={use}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900"
                      >
                        {use}
                      </span>
                    )) ?? [])}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">⚙️ Kaise Kaam Karta Hai</h3>
                  <p className="mt-4 text-sm text-slate-700">{result.howItWorks ?? ''}</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">⚠️ Side Effects</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-yellow-800">Common</span>
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                          {result.sideEffects?.common?.length ?? 0}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(result.sideEffects?.common?.map((effect) => (
                          <span
                            key={effect}
                            className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
                          >
                            {effect}
                          </span>
                        )) ?? [])}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-800">Serious</span>
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                          {result.sideEffects?.serious?.length ?? 0}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(result.sideEffects?.serious?.map((effect) => (
                          <span
                            key={effect}
                            className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                          >
                            {effect}
                          </span>
                        )) ?? [])}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-red-800">Rare</span>
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                          {result.sideEffects?.rare?.length ?? 0}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(result.sideEffects?.rare?.map((effect) => (
                          <span
                            key={effect}
                            className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
                          >
                            {effect}
                          </span>
                        )) ?? [])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-rose-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">🚫 Savdhaniyan (Warnings)</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {(result.warnings?.map((warning, index) => (
                      <li key={`${warning}-${index}`} className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>{warning}</span>
                      </li>
                    )) ?? [])}
                  </ul>
                </div>

                <div className="rounded-3xl bg-orange-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">🔄 Inke Saath Mat Lo</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(result.doNotTakeWith?.map((drug) => (
                      <span
                        key={drug}
                        className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                      >
                        {drug}
                      </span>
                    )) ?? [])}
                  </div>
                </div>

                {result.ayurvedicAlternative ? (
                  <div className="rounded-3xl bg-emerald-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">🌿 Ayurvedic Vikalp</h3>
                    <p className="mt-4 text-base font-semibold text-emerald-900">{result.ayurvedicAlternative?.name ?? ''}</p>
                    <p className="mt-2 text-sm text-slate-700">{result.ayurvedicAlternative?.benefit ?? ''}</p>
                  </div>
                ) : null}

                <div className="rounded-3xl bg-sky-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">📋 Dosage Note</h3>
                  <p className="mt-4 text-sm text-slate-700">{result.dosageNote ?? ''}</p>
                  <p className="mt-3 text-xs text-slate-600">Hamesha doctor ya pharmacist ki salah lein</p>
                </div>

                <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-sm text-slate-800">
                  <p className="font-semibold">Disclaimer</p>
                  <p className="mt-2">{result.disclaimer ?? ''}</p>
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
