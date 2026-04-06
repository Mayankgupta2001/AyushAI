"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface AyurvedicRemedy {
  name: string;
  herb: string;
  howToUse: string;
  timing: string;
}

interface ModernApproach {
  commonMeds: string[];
  whenToSeeDoctor: string;
}

interface SymptomResult {
  possibleConditions: string[];
  severity: "mild" | "moderate" | "severe";
  ayurvedicRemedies: AyurvedicRemedy[];
  modernApproach: ModernApproach;
  dietAdvice: string[];
  doNotDo: string[];
  disclaimer: string;
}

const symptomChips = [
  "Bukhar 🌡️",
  "Sar Dard 🤕",
  "Khansi 😷",
  "Pet Dard 🤢",
  "Thakan 😴",
  "Chakkar 💫",
  "Ulti 🤮",
  "Dast 💧",
  "Chest Pain ❤️",
  "Back Pain 🔙",
  "Joint Pain 🦴",
  "Anxiety 😰",
];

function SymptomCheckerContent() {
  const searchParams = useSearchParams();
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSymptoms(query);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/symptom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Kuch galat ho gaya.");
      }

      setResult(data as SymptomResult);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const appendChip = (chip: string) => {
    setSymptoms((prev) => (prev ? `${prev} ${chip}` : chip));
  };

  const severityBanner = (severity: SymptomResult["severity"]) => {
    if (severity === "mild") {
      return (
        <div className="rounded-2xl bg-emerald-100 border border-emerald-200 p-4 text-emerald-900">
          ✅ Mild — Ghar pe treatment ho sakta hai
        </div>
      );
    }
    if (severity === "moderate") {
      return (
        <div className="rounded-2xl bg-yellow-100 border border-yellow-200 p-4 text-yellow-900">
          ⚠️ Moderate — Doctor se mil lein
        </div>
      );
    }
    return (
      <div className="rounded-2xl bg-red-100 border border-red-200 p-4 text-red-900">
        🚨 Severe — Turant doctor ke paas jaayein!
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-3xl bg-[#0d4f3c] px-6 py-10 text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">🔍 Symptom Checker</h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base">
            Apne symptoms AI ko batao — Ayurvedic + Modern dono solution paao
          </p>
        </section>

        <main className="mt-8 space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Aapke symptoms kya hain?</h2>
            <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700" htmlFor="symptoms">
                Detail likhein
              </label>
              <textarea
                id="symptoms"
                rows={4}
                value={symptoms}
                onChange={(event) => setSymptoms(event.target.value)}
                placeholder="Jaise: Kal se bukhar hai, sar dard bhi hai, thoda khansi bhi..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Quick symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {symptomChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => appendChip(chip)}
                      className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {chip}
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
                    AI analyze kar raha hai... thoda wait karein 🙏
                  </>
                ) : (
                  "🔍 AI se Analyze Karo"
                )}
              </button>
            </form>
          </section>

          {result ? (
            <section className="space-y-6">
              <div>{severityBanner(result.severity)}</div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">🩺 Sambhavit Bimariyan</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.possibleConditions.map((condition) => (
                      <span
                        key={condition}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-emerald-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">🌿 Ayurvedic Upchar</h3>
                  <div className="mt-4 space-y-4">
                    {result.ayurvedicRemedies.map((remedy) => (
                      <div
                        key={remedy.name}
                        className="rounded-3xl border border-emerald-100 bg-white p-4"
                      >
                        <p className="text-base font-semibold text-emerald-900">{remedy.name}</p>
                        <p className="mt-1 text-sm italic text-emerald-700">Herb: {remedy.herb}</p>
                        <p className="mt-2 text-sm text-slate-700">{remedy.howToUse}</p>
                        <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                          {remedy.timing}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-sky-50 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">💊 Modern Medicine Approach</h3>
                  <p className="mt-3 text-sm text-slate-700">Doctor ki salah ke bina mat lein</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.modernApproach.commonMeds.map((med) => (
                      <span
                        key={med}
                        className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                    <p className="font-semibold">Doctor ke paas kab jaayein</p>
                    <p className="mt-1">{result.modernApproach.whenToSeeDoctor}</p>
                  </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="rounded-3xl bg-amber-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">🥗 Kya Khaayein</h3>
                    <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-slate-700">
                      {result.dietAdvice.map((advice, index) => (
                        <li key={`${advice}-${index}`}>{advice}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-3xl bg-rose-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">❌ Kya Na Karein</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {result.doNotDo.map((item, index) => (
                        <li key={`${item}-${index}`} className="flex items-start gap-2">
                          <span>❌</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-sm text-slate-800">
                <p className="font-semibold">Disclaimer</p>
                <p className="mt-2">{result.disclaimer}</p>
                <p className="mt-3 font-medium">Yeh AI ki salah hai, certified doctor nahi</p>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default function SymptomCheckerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-6 text-slate-900">Loading...</div>}>
      <SymptomCheckerContent />
    </Suspense>
  );
}
