import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';
import { slugify } from '../../lib/slugify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching blog posts' });
      }
      break;

    case 'POST':
      try {
        const { title, content, image_url } = req.body;
        
        // Validate required fields
        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        // Create post data without author_id requirement
        const postData = {
          title,
          content,
          image_url: image_url || null
        };

        // Remove author_id validation completely

        const slug = slugify(title).toLowerCase().replace(/[^a-z0-9-]/g, '-');
        if (!slug) {
          return res.status(400).json({ error: 'Failed to generate slug from title' });
        }
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([{ ...postData, slug }])
          .select();

        if (error) throw error;

        // Trigger sitemap generation
        await fetch('/api/generate-sitemap', { method: 'POST' });

        res.status(201).json(data[0]);
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Error creating blog post' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Trigger sitemap generation
        await fetch('/api/generate-sitemap', { method: 'POST' });

        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}