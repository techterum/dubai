import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';
import Head from 'next/head';

const Card = lazy(() => import('../../components/Card'));

// const categories = ['All', 'Call girl', 'Escort Agency', 'Massage Girls', 'Independent Escorts'];
// const states = ['All', 'Delhi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Belarusian'];

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  state: string;
  profile_image: string;
  additional_images: string[];
  phone: string;
  payment_plan: string | null;
  created_at: string;
  status: string;
}

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, [categoryFilter, stateFilter, minPrice, maxPrice, page]);

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .order('payment_plan', { ascending: false })
      .order('created_at', { ascending: false })
      .range((page - 1) * 12, page * 12 - 1);

    if (categoryFilter !== 'All') {
      query = query.eq('category', categoryFilter);
    }
    if (stateFilter !== 'All') {
      query = query.eq('state', stateFilter);
    }
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching listings:', error);
    } else {
      if (page === 1) {
        setListings(data || []);
      } else {
        setListings((prevListings) => [...prevListings, ...(data || [])]);
      }
      setHasMore(data.length === 12);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = () => {
    setPage(1);
    setHasMore(true);
    fetchListings();
  };

  return (
    <>
      <Head>
      <meta name="google-site-verification" content="8WzNwd4FQZ5ubM3ceOG0gwseCnQDdffj_2Z6OafEmo4" />
        <title>Escort Listings - Find Your Perfect Companion in Dubai</title>
        <meta name="description" content="Browse our extensive collection of verified escort listings in Dubai. Find the perfect companion with detailed profiles, photos, and contact information." />
        <meta property="og:title" content="Escort Listings - Dubai Escorts Service" />
        <meta property="og:description" content="Browse our extensive collection of verified escort listings in Dubai. Find the perfect companion with detailed profiles, photos, and contact information." />
        <meta property="og:description" content="Explore premium escort listings in Dubai with verified profiles, high-quality photos, and detailed information. Find your ideal companion with our secure and discreet platform." />
      </Head>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-black mb-8 p-10">Listings</h1>
        {/* Filters */}
        {/* <div className="mb-8 bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
              <select
                className="w-full rounded-md border-gray-700 bg-gray-700 text-gray-200"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  handleFilterChange();
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Location</label>
              <select
                className="w-full rounded-md border-gray-700 bg-gray-700 text-gray-200"
                value={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  handleFilterChange();
                }}
              >
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Min Price</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-700 bg-gray-700 text-gray-200"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  handleFilterChange();
                }}
                placeholder="Min Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Max Price</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-700 bg-gray-700 text-gray-200"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  handleFilterChange();
                }}
                placeholder="Max Price"
              />
            </div>
          </div>
        </div> */}
        {/* Listings Grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => router.push(`/listings/${listing.slug}`)}
              >
                <Card
                  mainImage={listing.profile_image}
                  subImages={listing.additional_images}
                  title={listing.title}
                  price={listing.price}
                  description={listing.description}
                  phone={listing.phone}
                  payment_plan={listing.payment_plan}
                />
              </div>
            ))}
          </div>
        </Suspense>

        {loading && <LoadingSpinner />}

        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && listings.length > 0 && (
          <p className="text-center text-gray-400 mt-8">No more listings to load</p>
        )}

        {listings.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-8">No listings found matching your criteria</p>
        )}
      </div>
    </>
  );
};

export default ListingsPage;