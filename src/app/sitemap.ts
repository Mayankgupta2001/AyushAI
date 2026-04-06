import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ayush-ai-t6bo.vercel.app';

  return [
    {
      url: baseUrl,
      priority: 1.0,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/symptom-checker`,
      priority: 0.9,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/remedies`,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/medicines`,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/clinics`,
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/health-tips`,
      priority: 0.8,
      changeFrequency: 'daily',
    },
  ];
}