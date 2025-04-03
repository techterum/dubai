import { GetStaticPaths, GetStaticProps } from 'next';
import { supabase } from '../../lib/supabase';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import he from 'he'; // Import the he library

interface Listing {
  slug: any;
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
  location?: string;
  address?: string;
  email?: string;
  website?: string;
}

interface ListingDetailsProps {
  listing: Listing;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleNextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % (listing.additional_images.length + 1));
  };

  const handlePrevImage = () => {
    setMainImageIndex((prevIndex) =>
      (prevIndex - 1 + listing.additional_images.length + 1) % (listing.additional_images.length + 1)
    );
  };

  const images = [listing.profile_image, ...listing.additional_images];
  const mainImage = images[mainImageIndex];

  if (!listing) {
    return <div>Loading...</div>;
  }

  // Decode HTML entities in the description
  const decodedDescription = he.decode(listing.description).substring(0, 160);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="8WzNwd4FQZ5ubM3ceOG0gwseCnQDdffj_2Z6OafEmo4" />
        <title>{listing.title} - UAE Escorts</title>
        <meta name="title" content={`${listing.title} - Best Escorts in UAE`} />
        {/* <meta name="description" content={decodedDescription} /> */}
        <meta name="description" content={he.decode(listing.description).slice(0, 560)} />
        {/* <meta property="og:description" content={decodedDescription} /> */}
        <meta property="og:image" content={mainImage} /> 
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={`https://www.dubai-escorts.me/listings/${listing.slug}`}/>
        <link rel="canonical" href={`https://www.dubai-escorts.me/listings/${listing.slug}`}/>
      </Head>
      <div className="min-h-screen bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-black overflow-x-auto" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-black hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 01-1.414-1.414L10 9.172l4.121 4.121a1 1 0 01-1.414 1.414L10 10.828l-2.707 2.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link href="/listings" className="ml-1 text-sm font-medium text-black hover:text-gray-900 md:ml-2">
                    Listings
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 01-1.414-1.414L10 9.172l4.121 4.121a1 1 0 01-1.414 1.414L10 10.828l-2.707 2.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-black md:ml-2 truncate max-w-[150px] sm:max-w-none">
                    {listing.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row bg-[#000000c7] shadow-lg rounded-lg p-6">
            {/* Left Section - Image Carousel */}
            <div className="relative flex-1 mb-6 lg:mb-0 lg:mr-6">
              <div className="relative w-full md:h-[800px] h-[300px] overflow-hidden max-w-[715px] max-h-[936px]">
                <img
                  src={mainImage}
                  alt={listing.title}
                  className="rounded-lg w-full h-full object-contain"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => setMainImageIndex(index)}
                    style={{ width: '100px', height: '100px' }}
                  />
                ))}
              </div>
            </div>

            {/* Right Section - Profile Details */}
            <div className="flex-1 space-y-4">
              {/* Title */}
              <h1 className="text-3xl font-bold text-white break-words">{listing.title}</h1>
              
              {/* About */}
              <div>
                <h3 className="font-semibold text-2xl text-white">About:</h3>
                <p className="text-white text-md text-justify">{listing.description}</p>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="font-bold text-lg text-white">Companionship Rates:</h3>
                <ul className="list-disc ml-6 text-white">
                  <li>1 hour: ₹{listing.price}</li>
                  <li>2 hours: ₹{listing.price * 1.5}</li>
                  <li>3 hours: ₹{listing.price * 2}</li>
                  <li>Full night: ₹{listing.price * 3.5}</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {/* Phone */}
                <section className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Phone Label */}
                    <span className="text-white">Phone:</span>
                    
                    {/* Phone Number Link */}
                    <a 
                      href={`tel:${listing.phone}`} 
                      className="text-blue-400 hover:text-blue-300 transition-colors break-all text-sm"
                    >
                      {listing.phone}
                    </a>
                    
                    {/* WhatsApp Link */}
                    <div className="ml-2 flex items-center">
                      <a 
                        href={`https://wa.me/${listing.phone}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-green-500"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Disclaimer Text */}
                  <span className="text-sm text-gray-300">
                    Tell that you're calling from Dubai-escorts.com to increase your chances of getting a discount.
                  </span>
                </section>

                {/* Email */}
                {listing.email && (
                  <div>
                    <h3 className="font-semibold text-lg text-white">Email:</h3>
                    <a href={`mailto:${listing.email}`} className="text-blue-500 hover:underline break-all">
                      {listing.email}
                    </a>
                  </div>
                )}

                {/* Website */}
                {listing.website && (
                  <div>
                    <h3 className="font-bold text-lg text-white">Website:</h3>
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      {listing.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="font-bold text-xl text-white">Details:</h3>
                <ul className="list-disc ml-6 text-white">
                  <li>Category: {listing.category}</li>
                  <li>State: {listing.state}</li>
                  {listing.location && <li>Location: {listing.location}</li>}
                  {listing.address && <li>Address: {listing.address}</li>}
                  <li>Payment Plan: {listing.payment_plan || 'Standard'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all listing slugs to pre-render
  const { data: listings } = await supabase
    .from('listings')
    .select('slug');

  // Validate and filter slugs
  const paths = listings
    ?.filter(listing => typeof listing.slug === 'string' && listing.slug.trim() !== '')
    .map((listing) => ({
      params: { slug: listing.slug },
    })) || [];

  return {
    paths,
    fallback: 'blocking', // Enable blocking fallback for better error handling
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!listing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listing,
    },
    revalidate: 10, // Revalidate the page every 10 seconds
  };
};

export default ListingDetails;