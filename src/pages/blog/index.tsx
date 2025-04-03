import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import Head from 'next/head';
import LoadingSpinner from '../../components/LoadingSpinner';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const BlogListing: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
    } else {
      setBlogPosts(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
      <meta name="google-site-verification" content="8WzNwd4FQZ5ubM3ceOG0gwseCnQDdffj_2Z6OafEmo4" />
        <title>Blog Posts - Dubai Escorts</title>
        <meta name="description" content="Read our latest blog posts about escort services in Dubai" />
        <meta property="og:title" content="Blog Posts - Dubai Escorts" />
        <meta property="og:description" content="Read our latest blog posts about escort services in Dubai" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/blog`} />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-black mb-8">Latest Blog Posts</h1>
        
        {blogPosts.length === 0 ? (
          <p className="text-center text-gray-400">No blog posts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#00000091] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {post.image_url && (
                  <div className="relative h-48">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-black mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <button
                      onClick={() => router.push(`/blog/${post.id}`)}
                      className="text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogListing;