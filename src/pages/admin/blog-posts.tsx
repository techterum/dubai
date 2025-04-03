import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';
import { uploadImage } from '../../lib/cloudinary';
import { slugify } from '../../lib/slugify';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
}

const AdminBlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image_url: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchBlogPosts();
  }, [user, router]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCreatePost = async () => {
    try {
      let image_url = '';
      if (selectedImage) {
        image_url = await uploadImage(selectedImage);
      }

      const slug = slugify(newPost.title).replace(/\s+/g, '-');
      const postData = {
        title: newPost.title,
        content: newPost.content,
        image_url,
        slug,
        // Only set author_id if user.id is a valid UUID
        author_id: user?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(user.id) ? user.id : null
      };

      const { error } = await supabase.from('blog_posts').insert([postData]);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      fetchBlogPosts();
      setNewPost({ title: '', content: '', image_url: '' });
      setSelectedImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Create New Blog Post</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full p-2 border rounded h-32"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-4">
            {post.image_url && (
              <div className="relative h-48 mb-4">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">
              {post.content.length > 100
                ? `${post.content.substring(0, 100)}...`
                : post.content}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => router.push(`/admin/blog-posts/edit/${post.id}`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogPosts;