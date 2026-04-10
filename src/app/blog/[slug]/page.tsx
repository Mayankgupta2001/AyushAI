import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getPostBySlug, getAllSlugs, type BlogPost } from '../_posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'hi_IN',
    },
  }
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-700 rounded-full flex-shrink-0" />
          {line.replace('## ', '')}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-base font-semibold text-gray-800 mt-4 mb-2">
          {line.replace('### ', '')}
        </h3>
      )
      i++
      continue
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      const rows = tableLines.filter((r) => !r.match(/^\|[-\s|]+\|$/))
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            {rows.map((row, ri) => {
              const cells = row.split('|').filter((c) => c.trim())
              if (ri === 0) {
                return (
                  <thead key={`thead-${ri}`}>
                    <tr className="bg-emerald-700 text-white">
                      {cells.map((cell, ci) => (
                        <th key={ci} className="px-3 py-2 text-left font-medium text-sm">
                          {cell.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )
              }
              return (
                <tbody key={`tbody-${ri}`}>
                  <tr className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-gray-700 border-b border-gray-100">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      )
      continue
    }

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl px-4 py-3 my-3 text-sm text-emerald-800 italic">
          {line.replace('> ', '')}
        </blockquote>
      )
      i++
      continue
    }

    if (line.startsWith('- ') || line.startsWith('✅ ') || line.startsWith('❌ ')) {
      const isCheck = line.startsWith('✅')
      const isCross = line.startsWith('❌')
      const text = line.replace(/^[-✅❌]\s/, '')
      elements.push(
        <div key={i} className="flex gap-2 items-start my-1.5">
          <span className="flex-shrink-0 mt-0.5 text-sm">
            {isCheck ? '✅' : isCross ? '❌' : '•'}
          </span>
          <span
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </div>
      )
      i++
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1] ?? ''
      const text = line.replace(/^\d+\.\s/, '')
      elements.push(
        <div key={i} className="flex gap-3 items-start my-2">
          <span className="w-6 h-6 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {num}
          </span>
          <span
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </div>
      )
      i++
      continue
    }

    if (line.includes('📞') || line.includes('🌐')) {
      elements.push(
        <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 my-3 text-sm text-emerald-700 font-medium">
          {line}
        </div>
      )
      i++
      continue
    }

    elements.push(
      <p
        key={i}
        className="text-sm text-gray-700 leading-relaxed my-2"
        dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>'),
        }}
      />
    )
    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const otherPosts = blogPosts.filter((p: BlogPost) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-emerald-700">होम</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
        <span>›</span>
        <span className="text-gray-700 truncate">{post.title.slice(0, 30)}...</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${post.categoryColor}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readTime} पढ़ें</span>
        </div>
        <div className="flex gap-3 mb-3">
          <span className="text-4xl">{post.icon}</span>
          <h1 className="text-lg font-semibold text-gray-900 leading-snug">{post.title}</h1>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">{post.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>📅 {post.date}</span>
          <span>•</span>
          <span>🌿 AyushAI</span>
          <span>•</span>
          <span>🇮🇳 हिंदी</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          ⚠️ <strong>ध्यान दें:</strong> यह जानकारी सामान्य स्वास्थ्य मार्गदर्शन के लिए है।
          किसी भी गंभीर बीमारी में योग्य Doctor से जरूर मिलें।
        </p>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        {renderContent(post.content)}
      </div>

      {/* CTA */}
      <div className="bg-emerald-700 text-white rounded-2xl p-5 mb-4 text-center">
        <p className="font-medium mb-1">🌿 और स्वास्थ्य सवाल हैं?</p>
        <p className="text-emerald-200 text-sm mb-3">AyushAI से हिंदी में पूछें — तुरंत आयुर्वेदिक जवाब</p>
        <Link
          href="/"
          className="inline-block bg-white text-emerald-700 rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-emerald-50 transition-all"
        >
          🤖 AI से पूछें — Free!
        </Link>
      </div>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-700 rounded-full" />
            और पढ़ें
          </h3>
          <div className="flex flex-col gap-3">
            {otherPosts.map((p: BlogPost) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-3 hover:shadow-sm hover:border-emerald-700 transition-all group"
              >
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{p.readTime} पढ़ें</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}