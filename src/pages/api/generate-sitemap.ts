import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { supabase } from '../../lib/supabase';

const BASE_URL = 'https://www.dubai-escorts.me';

const staticUrls = [
  { url: '', changefreq: 'daily', priority: 1.0 },
  { url: 'about', changefreq: 'weekly', priority: 0.8 },
  { url: 'login', changefreq: 'monthly', priority: 0.5 },
  { url: 'register', changefreq: 'monthly', priority: 0.5 },
  { url: 'dashboard', changefreq: 'weekly', priority: 0.8 },
  { url: 'create-listing', changefreq: 'weekly', priority: 0.8 },
  { url: 'blog', changefreq: 'daily', priority: 0.9 },
  { url: 'listings', changefreq: 'daily', priority: 0.9 },
  { url: 'admin', changefreq: 'monthly', priority: 0.3 },
  { url: 'admin/blog-posts', changefreq: 'monthly', priority: 0.3 },
  { url: 'admin-dashboard', changefreq: 'monthly', priority: 0.3 }
];

async function getDynamicUrls() {
  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, created_at');

  // Fetch listings
  const { data: listings } = await supabase
    .from('listings')
    .select('id, created_at');

  const dynamicUrls = [];

  // Add listing URLs
  if (listings) {
    for (const listing of listings) {
      dynamicUrls.push({
        url: `listings/${listing.id}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date(listing.created_at).toISOString()
      });
    }
  }

  // Add blog post URLs
  if (blogPosts) {
    for (const post of blogPosts) {
      dynamicUrls.push({
        url: `blog/${post.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(post.created_at).toISOString()
      });
    }
  }

  return dynamicUrls;
}

async function generateSitemap() {
  const dynamicUrls = await getDynamicUrls();
  const urls = [...staticUrls, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ url, changefreq, priority, lastmod }) => {
      return `<url>
    <loc>${encodeURIComponent(BASE_URL + '/' + url)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
    })
    .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  return sitemap;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const sitemap = await generateSitemap();
    res.status(200).json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
}