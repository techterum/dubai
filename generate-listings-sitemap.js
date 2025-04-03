import { supabase } from './src/lib/supabase';
import fs from 'fs';
import path from 'path';

const generateListingsSitemap = async () => {
  const { data: listings } = await supabase
    .from('listings')
    .select('slug, updated_at')
    .eq('status', 'approved');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${listings
    .map((listing) => {
      return `
    <url>
      <loc>https://www.example.com/listings/${listing.slug}</loc>
      <lastmod>${new Date(listing.updated_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap-listings.xml'), sitemap);
};

generateListingsSitemap();