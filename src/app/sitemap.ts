import { MetadataRoute } from 'next'
import { getAllSlugs } from './blog/_posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ayush-ai-t6bo.vercel.app'
  const now = new Date()

  const blogUrls: MetadataRoute.Sitemap = getAllSlugs().map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      priority: 1.0,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/symptom-checker`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/remedies`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/medicines`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/clinics`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/health-tips`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      priority: 0.3,
      changeFrequency: 'monthly',
    },
    ...blogUrls,
  ]
}