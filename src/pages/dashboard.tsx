import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  status: string;
  profile_image: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 5;

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchUserListings();
  }, [user, router, sortOption]);

  const fetchUserListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', user?.id)
      .order(sortOption, { ascending: sortOption === 'price' ? true : false });

    if (error) {
      toast.error('Error fetching listings');
    } else {
      setListings(data || []);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id);

    if (error) {
      toast.error('Error deleting listing');
    } else {
      toast.success('Listing deleted successfully');
      fetchUserListings();
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-listing/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/listings/${id}`);
  };

  const filteredListings = listings
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || listing.category === categoryFilter)
    )
    .slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage);

  const totalPages = Math.ceil(listings.length / listingsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white shadow-sm">My Dashboard</h1>
        <button
          onClick={() => router.push('/create-listing')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create New Listing
        </button>
      </div>

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search listings..."
            className="border border-gray-300 rounded-md p-2 mr-2 mb-2 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md p-2 mr-2 mb-2 md:mb-0"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Call girl">Call Girl</option>
            <option value="Escort Agency">Escort Agency</option>
            <option value="Massage Girls">Massage Girls</option>
            {/* Add more categories as needed */}
          </select>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="created_at">Sort by Date</option>
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      <div className="bg-[#000000c7] shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredListings.map((listing) => (
            <li key={listing.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center">
                <img
                  src={listing.profile_image}
                  alt="Profile"
                  className="h-40 w-40 rounded-md object-cover mr-4"
                />
                <div className="flex-grow cursor-pointer" onClick={() => handleView(listing.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-2xl font-white font-medium  truncate">
                        {listing.title}
                      </h3>
                      <p className="mt-1 text-sm text-white">{listing.description}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <span className="text-lg font-medium text-white">${listing.price}</span>
                      <button
                        onClick={() => handleEdit(listing.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-white">{listing.category}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Posted on {new Date(listing.created_at).toLocaleDateString()}</p>
                      <span
                        className={`ml-2 text-sm font-medium ${listing.status === 'approved' ? 'text-green-600' : listing.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
