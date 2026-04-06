import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0d4f3c] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">🌿 AyushAI के बारे में</h1>
          <p className="text-green-100 text-lg">India ka pehla free Ayurveda + Modern Medicine AI</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Mission */}
        <div className="bg-green-50 border-l-4 border-[#0d4f3c] rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#0d4f3c] mb-3">🎯 हमारा मिशन</h2>
          <p className="text-gray-700 leading-relaxed">
            AyushAI India ka pehla free AI health assistant hai jo Ayurveda aur Modern Medicine ko ek saath laata hai.
            Hamara lakshya hai ki har Indian ko quality health information free mein mile — chahe woh gaon mein ho ya shehar mein.
            Hum maante hain ki swasthya jaankari sabka adhikar hai.
          </p>
        </div>

        {/* What We Offer */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🛠️ Kya Milega AyushAI Mein</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🔍', title: 'Symptom Checker', desc: 'AI powered symptom analysis — Ayurvedic + Modern dono solutions', link: '/symptom-checker' },
              { icon: '🌿', title: 'Ayurvedic Remedies', desc: 'Traditional Indian remedies, Dosha analysis, Herbal solutions', link: '/remedies' },
              { icon: '💊', title: 'Medicine Info', desc: 'Kisi bhi medicine ke side effects Hindi mein jaanein', link: '/medicines' },
              { icon: '🏥', title: 'Free Clinics', desc: 'Nearest government health centers, Jan Aushadhi, PHC dhundho', link: '/clinics' },
              { icon: '📋', title: 'Health Tips', desc: 'Roz ek nayi Ayurvedic + Modern science health tip', link: '/health-tips' },
              { icon: '🆓', title: 'Always Free', desc: 'Koi registration nahi, koi fees nahi — hamesha free', link: '/' },
            ].map((item, i) => (
              <Link href={item.link} key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-green-300 transition-all">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-[#0d4f3c] text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">⚙️ Technology</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Llama 3.3 70B AI', 'Next.js 14', 'Groq API', 'TypeScript', 'Tailwind CSS', 'Vercel'].map((tech, i) => (
              <span key={i} className="bg-green-700 px-4 py-2 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-6 text-green-200 text-sm">Built with ❤️ for India 🇮🇳</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6">
          <h2 className="text-xl font-bold text-amber-800 mb-3">⚠️ Medical Disclaimer</h2>
          <p className="text-amber-900 leading-relaxed">
            AyushAI sirf <strong>educational aur informational purposes</strong> ke liye hai.
            Yeh kisi licensed doctor, vaidya, ya healthcare professional ki jagah nahi le sakta.
            Kisi bhi health decision se pehle qualified doctor se zaroor milein.
          </p>
          <p className="text-amber-900 mt-3 font-semibold">
            🚨 Emergency mein turant <a href="tel:108" className="underline">108</a> call karein.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">📧 Feedback & Contact</h2>
          <p className="text-gray-600 mb-3">Aapke suggestions hamare liye bahut important hain!</p>
          <a href="mailto:ayushai.help@gmail.com"
            className="inline-block bg-[#0d4f3c] text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition-colors">
            ayushai.help@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}