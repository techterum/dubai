import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

const Card = lazy(() => import('../components/Card'));

const categories = ['All', 'Call girl', 'Escort Agency', 'Massage Girls', 'Independent Escorts'];
const states = ['All', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Belarusian'];

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

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const Home: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const sortListingsByPriority = (listings: Listing[]) => {
    return [...listings].sort((a, b) => {
      const getPlanPriority = (plan: string | null) => {
        switch (plan?.toLowerCase()) {
          case 'team':
            return 3;
          case 'pro':
            return 2;
          default:
            return 1;
        }
      };

      const priorityA = getPlanPriority(a.payment_plan);
      const priorityB = getPlanPriority(b.payment_plan);

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  useEffect(() => {
    fetchListings();
    fetchBlogPosts();
  }, [categoryFilter, stateFilter, minPrice, maxPrice, page]);

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .order('payment_plan', { ascending: false }) // Add this to prioritize premium plans
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1);

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
      // Remove the sortListingsByPriority call since we're now sorting at the database level
      if (page === 1) {
        setListings(data || []);
      } else {
        setListings((prevListings) => [...prevListings, ...(data || [])]);
      }

      setHasMore(data.length === 10);
    }
    setLoading(false);
  };

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
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = () => {
    setPage(1);
    setHasMore(true);
    fetchListings();
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="8WzNwd4FQZ5ubM3ceOG0gwseCnQDdffj_2Z6OafEmo4"
        />
        <title>Dubai Escorts Service 100+ High Profile Escorts in Dubai from 600 AED</title>
        <meta
          name="title"
          content="Dubai Escorts Service 100+ High Profile Escorts in Dubai from 600 AED"
        />
        <meta
          name="description"
          content="Discover exclusive and premium listings of Dubai Escorts. All types of escort girls waiting to make your stay in Dubai with their seductive services."
        />

        <meta
          property="og:title"
          content="Dubai Escorts Service 100+ High Profile Escorts in Dubai from 600 AED"
        />
        <meta
          property="og:description"
          content="Discover exclusive and premium listings of Dubai Escorts. All types of escort girls waiting to make your stay in Dubai with their seductive services"
        />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="Explore Dubai’s Top Escort Services with Verified Call Girls. Affordable Rates, Hotel Stays & Doorstep Delivery. Premium Companionship Awaits!"
        />
        <meta
          name="keywords"
          content="dubai call girls,Dubai escorts, high-class escorts, escort services Dubai, call girls, professional escorts, Dubai call girls, Call Girls in Dubai, Independent Escorts in Dubai"
        />
        <meta name="author" content="Dubai Escorts" />
        {/* <meta property="og:title" content="Premium Dubai Escorts & Call Girls | 24/7 In-Call Services Available"/>
        <meta property="og:description" content="Explore Dubai’s Top Escort Services with Verified Call Girls. Affordable Rates, Hotel Stays & Doorstep Delivery. Premium Companionship Awaits!"/> */}
        {/* <meta property="og:image" content="URL_to_your_image.jpg"/> */}
        {/* <meta property="og:url" content="https://www.dubai-escorts.me"/> */}
        <link rel="canonical" href="https://www.dubai-escorts.me" />
        {/* <meta property="og:type" content="website"/>  */}
      </Head>
      <div className="main-content">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mb-6 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,1fr)] gap-6 overflow-x-hidden">
          {/* Listings Section */}
          <div>
            {/* <h2 className="text- sm:text-2xl font-bold mb-1 sm:mb-2 text-black bg-gray-800 bg-opacity-50 inline-block p-2 rounded-md">
              Welcome to Dubai Escorts
            </h2> */}
            {/* <h2 className="text-red sm:text-2xl font-bold mb-1 sm:mb-2 inline-block p-2 rounded-md">
              Welcome to Dubai Escorts
            </h2> */}
            <h1 className="text-[#F50065] text-xl">Welcome to Dubai Escorts </h1>
            <p className="text-[#661C21] mb-10 text-justify sm:text-left">
              Welcome To the Most Prestigious Dubai Escorts Agency, Our Escort Girls Not For
              Everyone! DEAR GUEST, Are You Looking for An Open-Open Young girl with Heart & Mind,
              But Also Lots of Corners and Edges? Perhaps, Are You Also Looking for A Naughty Dubai
              escorts who “Shows You Where to Go” But Still, Very Great Value Seriousity &
              Discretion Is Important? Then You Are Exactly Right Here!!! listing Luxury, Hi-Profile
              and Elite independent escorts, transsexuals, shemales, gays, professional erotic
              massage parlors, adult spas, private brothels, agencies in Dubai and nearby cities in
              UAE.
            </p>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMore}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Load More
                </button>
              </div>
            )}

            {!hasMore && listings.length > 0 && (
              <p className="text-center text-gray-400 mt-4">No more listings to load</p>
            )}
          </div>

          {/* Blog Section */}
          <div className="lg:pl-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#F50065] bg-[#EFEDE9] bg-opacity-50 inline-block p-2 rounded-md">
              Blogs
            </h2>
            <div className="hidden lg:block space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-[#EFEDE9] p-4 rounded-md shadow-md">
                  <h3 className="text-lg text-black font-semibold mb-2">{post.title}</h3>
                  <p className="text-black text-balance">{post.content.substring(0, 100)}...</p>
                  <button
                    className="text-indigo-600 hover:underline mt-2"
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    Read more
                  </button>
                </div>
              ))}
              {blogPosts.length === 0 && (
                <p className="text-center text-gray-500">No blog posts found</p>
              )}
            </div>

            {/* Mobile Blog Carousel */}
            <div className="lg:hidden">
              <Slider {...settings}>
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-[#00000091] p-4 rounded-md shadow-md">
                    <h3 className="text-lg text-white font-semibold mb-2">{post.title}</h3>
                    <p className="text-white text-balance">{post.content.substring(0, 100)}...</p>
                    <button
                      className="text-indigo-600 hover:underline mt-2"
                      onClick={() => router.push(`/blog/${post.slug}`)}
                    >
                      Read more
                    </button>
                  </div>
                ))}
                {blogPosts.length === 0 && (
                  <div>
                    <p className="text-center text-gray-500">No blog posts found</p>
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
