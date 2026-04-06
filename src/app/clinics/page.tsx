"use client";

import { useState } from 'react';

export default function ClinicsPage() {
  const [city, setCity] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!response.ok) throw new Error('Reverse geocoding failed');

          const data = await response.json();
          const detectedCity =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            'Unknown location';

          setCity(detectedCity);
        } catch {
          setLocationError('Unable to detect your location. Please enter city manually.');
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        let errorMessage = 'Unable to get your location';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access and try again.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const openGoogleMaps = (query: string) => {
    if (!city.trim()) {
      alert('Please enter a city first');
      return;
    }
    const searchQuery = encodeURIComponent(`${query} near ${city}`);
    window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank');
  };

  const helplines = [
    { number: '104', name: 'Swasthya Helpline', description: 'Health queries' },
    { number: '108', name: 'Ambulance', description: 'Emergency ambulance' },
    { number: '102', name: 'Maternity', description: 'Pregnancy & child care' },
    { number: '1800-180-1104', name: 'Ayush Helpline', description: 'Ayurveda & alternative medicine' },
    { number: '112', name: 'Emergency', description: 'All emergency services' },
  ];

  const schemes = [
    {
      icon: '🏥',
      title: 'PHC (Primary Health Centre)',
      description: 'Gaon aur mohalle mein milte hain, bilkul free OPD',
      badge: 'Free OPD',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      icon: '💊',
      title: 'Jan Aushadhi Kendra',
      description: 'Generic dawaiyan 50-90% sasti, 9000+ kendron pe',
      badge: '90% Sasta',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      icon: '🏛️',
      title: 'CGHS Dispensary',
      description: 'Central government employees ke liye',
      badge: 'Govt Employees',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      icon: '🏭',
      title: 'ESI Hospital',
      description: 'Private sector workers ke liye free treatment',
      badge: 'Private Workers',
      badgeColor: 'bg-orange-100 text-orange-800',
    },
    {
      icon: '💝',
      title: 'Ayushman Bharat',
      description: '5 lakh tak free treatment, 50 crore se zyada log',
      badge: '5 Lakh Free',
      badgeColor: 'bg-red-100 text-red-800',
    },
  ];

  const tips = [
    'Aadhar card saath rakhein PHC mein',
    'Jan Aushadhi mein doctor ki parchi zaroori hai',
    'Ayushman card banwane ke liye CSC center jaayein',
    '104 pe call karke nearest clinic pooch sakte ho',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">🏥 Free Clinics Finder</h1>
          <p className="text-green-100 text-lg">
            Nearest government hospitals, Jan Aushadhi, PHC centers dhundho
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Search Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Apna shehar likho... Jaise: Delhi, Mumbai, Jaipur"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleGeolocation}
                disabled={locationLoading}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {locationLoading ? '🔄...' : '📍 Apni Location Use Karo'}
              </button>
            </div>

            {locationError && (
              <p className="text-red-600 text-sm">{locationError}</p>
            )}

            <div className="grid md:grid-cols-2 gap-3">
              <button
                onClick={() => openGoogleMaps('government hospital')}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                🗺️ Google Maps pe Dhundho
              </button>
              <button
                onClick={() => openGoogleMaps('jan aushadhi kendra')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                💊 Jan Aushadhi Kendra Dhundho
              </button>
            </div>
          </div>
        </div>

        {/* Helpline Numbers Card */}
        <div className="bg-green-800 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">📞 Emergency Helplines</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helplines.map((helpline, index) => (
              <a
                key={index}
                href={`tel:${helpline.number}`}
                className="bg-green-700 hover:bg-green-600 rounded-lg p-4 transition-colors text-center"
              >
                <div className="text-2xl font-bold mb-1">{helpline.number}</div>
                <div className="font-semibold">{helpline.name}</div>
                <div className="text-green-100 text-sm">{helpline.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Government Schemes Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🏛️ Sarkari Swasthya Yojanaen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{scheme.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{scheme.description}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${scheme.badgeColor}`}
                >
                  {scheme.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">💡 Kaam ki Baatein</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}