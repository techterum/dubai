//notworking admin dashboard copy of admin dashboard
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  profile_image: string;
  status: string;
  payment_plan: string | null;
  user_id: string;
  phone: string;
  email: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [view, setView] = useState<'listings' | 'blogs'>('listings');

  useEffect(() => {
    if (!user && !loading) {
      toast.error('You must be logged in to access the admin dashboard');
      router.push('/admin-login');
      return;
    }

    if (user) {
      fetchListings();
    }
  }, [user, loading, router, filter, sortBy]);

  const fetchListings = async () => {
    setLoadingListings(true);
    let query = supabase.from('listings').select('*');

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    query = query.order('created_at', { ascending: sortBy === 'oldest' });

    const { data, error } = await query;

    if (error) {
      toast.error('Error fetching listings');
    } else {
      setListings(data || []);
    }
    setLoadingListings(false);
  };

  const handleApprove = async (id: string) => {
    const listing = listings.find((l) => l.id === id);

    const { error } = await supabase.from('listings').update({ status: 'approved' }).eq('id', id);

    if (error) {
      toast.error('Error approving listing');
    } else {
      toast.success('Listing approved successfully');
      fetchListings();
    }
  };

  const handleReject = async (id: string) => {
    const listing = listings.find((l) => l.id === id);

    const { error } = await supabase.from('listings').update({ status: 'rejected' }).eq('id', id);

    if (error) {
      toast.error('Error rejecting listing');
    } else {
      toast.success('Listing rejected successfully');
      fetchListings();
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPlanBadgeClass = (plan: string | null) => {
    switch (plan?.toLowerCase()) {
      case 'pro':
        return 'bg-purple-100 text-purple-800';
      case 'team':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPlanDisplayName = (plan: string | null) => {
    return plan ? plan.toUpperCase() : 'FREE';
  };

  if (loading || loadingListings) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${view === 'listings' ? 'bg-blue-600 text-white' : 'bg-[gray-200] text-gray-800'}`}
            onClick={() => setView('listings')}
          >
            Manage Listings
          </button>
          <button
            className={`px-4 py-2 rounded-md ${view === 'blogs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setView('blogs')}
          >
            Manage Blogs
          </button>
        </div>
      </div>

      {view === 'listings' && (
        <>
          <div className="flex space-x-4 mb-8">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-md border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-md border-gray-300"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="divide-y divide-gray-200">
              {listings.map((listing) => (
                <div key={listing.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
                        <div className="flex space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(listing.status)}`}
                          >
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanBadgeClass(listing.payment_plan)}`}
                          >
                            {getPlanDisplayName(listing.payment_plan)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        <p className="mb-2">{listing.description}</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p>
                              <span className="font-medium">Category:</span> {listing.category}
                            </p>
                            <p>
                              <span className="font-medium">Price:</span> AED {listing.price}
                            </p>
                            <p>
                              <span className="font-medium">Created:</span>{' '}
                              {formatDate(listing.created_at)}
                            </p>
                          </div>
                          <div>
                            <p>
                              <span className="font-medium">Phone:</span> {listing.phone || 'N/A'}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {listing.email || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {listing.status === 'pending' && (
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleApprove(listing.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(listing.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {listings.length === 0 && (
                <div className="p-6 text-center text-gray-500">No listings found</div>
              )}
            </div>
          </div>
        </>
      )}

      {view === 'blogs' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="p-6">
            <Link
              href="/admin/blog-posts"
              className="block bg-[#00000091] text-white  px-4 py-2 rounded mb-4"
            >
              Create New Blog Post
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
