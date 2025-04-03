import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { GetStaticProps } from 'next';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
}

interface AdminBlogPostsProps {
  initialPosts: BlogPost[];
  userId: string | null;
}

export default function AdminBlogPosts({ initialPosts, userId }: AdminBlogPostsProps) {
  const router = useRouter();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // If you want to guard on client side as well (in case user logs out):
  useEffect(() => {
    if (!userId) {
      toast.error('You must be logged in to access the admin dashboard');
      router.push('/AdminLogin');
    }
  }, [userId, router]);

  const fetchBlogPosts = async () => {
    try {
      setLoadingPosts(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Error fetching blog posts');
      } else {
        setBlogPosts(data || []);
      }
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleSave = async () => {
    let image_url = '';
    if (!userId) {
      toast.error('No user session found. Please log in again.');
      return;
    }

    if (image) {
      try {
        image_url = await uploadImage(image);
      } catch (error) {
        toast.error('Error uploading image');
        return;
      }
    }

    if (editingPostId) {
      // Update
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          image_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPostId);

      if (error) {
        toast.error('Error updating post');
      } else {
        toast.success('Post updated successfully');
      }
    } else {
      // Create
      const { error } = await supabase.from('blog_posts').insert({
        title,
        content,
        image_url,
        author_id: userId,
      });

      if (error) {
        toast.error('Error creating post');
      } else {
        toast.success('Post created successfully');
      }
    }

    setTitle('');
    setContent('');
    setImage(null);
    setEditingPostId(null);
    fetchBlogPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setTitle(post.title);
    setContent(post.content);
    setImage(null);
    setEditingPostId(post.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      toast.error('Error deleting post');
    } else {
      toast.success('Post deleted successfully');
    }
    fetchBlogPosts();
  };

  // If posts are still loading after mount
  if (loadingPosts) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Admin Blog Posts</title>
        <meta name="description" content="Manage blog posts in the admin dashboard." />
      </Head>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Blog Posts</h1>
        <div className="mb-6 space-y-4 bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-3 border rounded-lg bg-white"
          />
          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            {editingPostId ? 'Update Post' : 'Create Post'}
          </button>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="p-6 bg-gray-100 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="mb-4 w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex space-x-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {blogPosts.length === 0 && (
            <p className="text-center text-gray-500">No blog posts found</p>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // For static export, we'll pre-render with empty initial data
  // and fetch data client-side
  return {
    props: {
      initialPosts: [],
      userId: null,
    },
  };
};
