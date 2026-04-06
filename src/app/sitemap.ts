import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ayushai.vercel.app',
      priority: 1.0,
      changeFrequency: 'daily',
    },
    {
      url: 'https://ayushai.vercel.app/symptom-checker',
      priority: 0.9,
      changeFrequency: 'daily',
    },
    {
      url: 'https://ayushai.vercel.app/remedies',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://ayushai.vercel.app/medicines',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://ayushai.vercel.app/clinics',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://ayushai.vercel.app/health-tips',
      priority: 0.8,
      changeFrequency: 'daily',
    },
  ];
}