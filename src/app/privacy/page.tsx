export default function PrivacyPage() {
    const sections = [
      {
        title: '📋 Introduction',
        content: `AyushAI ("hum", "hamara") aapki privacy ki raksha karna hamari zimmedari hai. Yeh Privacy Policy batati hai ki hum kaunsi jaankari collect karte hain aur use kaise use karte hain.`,
      },
      {
        title: '🔒 Information We Collect',
        content: `Hum koi bhi personal information collect NAHI karte. AyushAI mein:
  • Koi registration nahi
  • Koi login nahi
  • Koi personal data store nahi hota
  
  Aap jo symptoms ya questions type karte hain woh sirf AI response generate karne ke liye use hote hain aur hamare servers pe store nahi hote.`,
      },
      {
        title: '🤝 Third Party Services',
        content: `Hum in third-party services use karte hain:
  • Google AdSense — Ads dikhane ke liye (Google ki privacy policy apply hoti hai)
  • Groq API — AI responses generate karne ke liye
  • Vercel — Website hosting ke liye
  • Google Analytics — Anonymous traffic data ke liye`,
      },
      {
        title: '🍪 Cookies',
        content: `Google AdSense cookies use karta hai relevant ads dikhane ke liye. Aap apne browser settings mein cookies disable kar sakte hain. Cookies disable karne se site functionality par koi asar nahi padega.`,
      },
      {
        title: '⚠️ Medical Disclaimer',
        content: `AyushAI ki information sirf educational aur informational purposes ke liye hai. Yeh professional medical advice, diagnosis, ya treatment nahi hai. Kisi bhi health problem mein licensed doctor se milein.
  
  Emergency situations mein turant 108 call karein.`,
      },
      {
        title: '👶 Children Privacy',
        content: `AyushAI 13 saal se kam umra ke bachon ke liye nahi hai. Hum jaante bujhte 13 saal se kam umra ke bachon ki personal information collect nahi karte.`,
      },
      {
        title: '📧 Contact Us',
        content: `Privacy se related koi bhi sawaal ho toh humse sampark karein:\nayushai.help@gmail.com`,
      },
      {
        title: '🔄 Changes to This Policy',
        content: `Hum is Privacy Policy ko kabhi bhi update kar sakte hain. Koi bhi changes is page pe publish honge. Last updated: April 2026.`,
      },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-[#0d4f3c] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3">🔒 Privacy Policy</h1>
            <p className="text-green-100">Last updated: April 2026</p>
          </div>
        </div>
  
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
  
          {/* Quick Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <p className="text-green-800 font-semibold text-center">
              ✅ AyushAI aapka koi bhi personal data collect, store ya sell nahi karta. Aap completely safe hain.
            </p>
          </div>
  
          {/* All Sections */}
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border-l-4 border-[#0d4f3c] p-6">
              <h2 className="text-xl font-bold text-[#0d4f3c] mb-3">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
  
          {/* Bottom Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-center">
            <p className="text-amber-800 text-sm">
              Is policy ke baare mein koi sawaal hai? Humse contact karein:{' '}
              <a href="mailto:ayushai.help@gmail.com" className="font-semibold underline">
                ayushai.help@gmail.com
              </a>
            </p>
          </div>
  
        </div>
      </div>
    );
  }