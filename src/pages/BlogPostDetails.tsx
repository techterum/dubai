import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const BlogPostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();

    if (error) {
      console.error('Error fetching blog post:', error);
    } else {
      setBlogPost(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#33343b]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-[#33343b] flex items-center justify-center">
        <p className="text-gray-300 text-lg">Blog post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#33343b] py-16">
      <Helmet>
        <title>{blogPost.title} | My Blog</title>
        <meta name="description" content={blogPost.content.slice(0, 160)} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.content.slice(0, 160)} />
        <meta property="og:image" content={blogPost.image_url} />
        <meta property="og:url" content={`https://www.dubai-escorts.me/blog/${blogPost.id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.content.slice(0, 160)} />
        <meta name="twitter:image" content={blogPost.image_url} />
      </Helmet>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <time className="text-gray-400 text-sm">
            {new Date(blogPost.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl font-bold text-white mt-2 mb-6 leading-tight">
            {blogPost.title}
          </h1>
        </div>

        {blogPost.image_url && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src={blogPost.image_url}
              alt={blogPost.title}
              className="w-full h-96 object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed">
          {blogPost.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetails;
