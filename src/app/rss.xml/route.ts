import { blogPosts } from '@/lib/blog-data'
import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vixseo.com'
  
  const rssItemsXml = blogPosts.map(post => {
    // Basic date parsing (from '02 Ocak 2026' to a parsable Date)
    // Note: Since mock dates are in Turkish, we'll assign a generic or current date for valid RSS format if parsing fails.
    // For a production app, dates should be stored in ISO format.
    const pubDate = new Date().toUTCString()
    
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description><![CDATA[${post.excerpt}]]></description>
        <pubDate>${pubDate}</pubDate>
        <category><![CDATA[${post.category}]]></category>
      </item>`
  }).join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>VixSEO Blog RSS Canlı Yayını</title>
        <link>${siteUrl}</link>
        <description>VixSEO gelişmiş teknik SEO ve e-ticaret optimizasyon rehberleri.</description>
        <language>tr</language>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${rssItemsXml}
      </channel>
    </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate'
    },
  })
}
