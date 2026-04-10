import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const pageLinks = [
    { href: '/symptom-checker', label: 'Symptom Checker' },
    { href: '/remedies', label: 'Remedies' },
    { href: '/medicines', label: 'Medicines' },
    { href: '/clinics', label: 'Free Clinics' },
    { href: '/health-tips', label: 'Health Tips' },
    { href: '/blog', label: 'Blog 📚' },
  ];

  const helplineNumbers = [
    { number: '104', description: 'Health Helpline' },
    { number: '108', description: 'Ambulance' },
  ];

  return (
    <footer className="bg-[#0d4f3c] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl">🌿</span>
            <span className="text-2xl font-bold">AyushAI</span>
          </div>
          <p className="text-lg font-medium">
            आपका स्वास्थ्य, हमारी जिम्मेदारी
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-center text-sm hover:text-green-200 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Helpline Numbers */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-4">Emergency Helplines</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
            {helplineNumbers.map((helpline) => (
              <div key={helpline.number} className="text-center">
                <p className="text-2xl font-bold text-yellow-300">{helpline.number}</p>
                <p className="text-sm">{helpline.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="text-center mb-8">
          <p className="text-sm bg-red-600 bg-opacity-20 rounded-lg px-4 py-2 inline-block">
            ⚠️ AyushAI sirf jaankari ke liye hai, doctor ki jagah nahi
          </p>
        </div>

        {/* Privacy & About Links */}
        <div className="flex justify-center gap-6 mb-6">
          <Link
            href="/about"
            className="text-sm text-green-200 hover:text-white transition-colors duration-200"
          >
            About Us
          </Link>
          <span className="text-green-600">|</span>
          <Link
            href="/blog"
            className="text-sm text-green-200 hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
          <span className="text-green-600">|</span>
          <Link
            href="/privacy"
            className="text-sm text-green-200 hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="text-center border-t border-green-700 pt-6">
          <p className="text-sm">Made with ❤️ for India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;