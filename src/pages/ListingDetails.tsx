import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  profile_image: string;
  additional_images: string[];
  name: string;
  phone: string;
  location: string;
  state: string;
  services: {
    [key: string]: boolean;
  };
  address: string;
  email: string;
  website: string;
}

export default function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  // const [currentDateTime, setCurrentDateTime] = useState('');
  // const [currentUser] = useState('kamaralamkhan');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true); // Set loading state before fetch
      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();

      if (error) {
        throw new Error(error.message);
      }

      setListing(data);
      setMainImageIndex(0);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    if (listing) {
      setMainImageIndex((prevIndex) => (prevIndex + 1) % (listing.additional_images.length + 1));
    }
  };

  const handlePrevImage = () => {
    if (listing) {
      setMainImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + listing.additional_images.length + 1) %
          (listing.additional_images.length + 1)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    );
  }

  const images = [listing.profile_image, ...listing.additional_images];
  const mainImage = images[mainImageIndex];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-white" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-white hover:text-gray-900">
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
                <Link
                  to="/"
                  className="ml-1 text-sm font-medium text-white hover:text-gray-900 md:ml-2"
                >
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
                <span className="ml-1 text-sm font-medium text-white md:ml-2">{listing.title}</span>
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
            <h2 className="text-4xl font-bold text-white">{listing.title}</h2>
            {/* About */}
            <div>
              <h3 className="font-semibold text-2xl text-white">About:</h3>
              <p className="text-white text-xl text-justify">{listing.description}</p>
            </div>
            {/* Phone */}
            <div>
              <h3 className="font-semibold text-lg text-white">Phone:</h3>
              <div className="flex items-center space-x-4">
                <a href={`tel:${listing.phone}`} className="text-blue-500 hover:underline">
                  {listing.phone}</a>
                <a
                  href={`https://wa.me/${listing.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            {/* Email */}
            <div>
              <h3 className="font-semibold text-lg text-white">Email:</h3>
              {listing.email && (
                <a href={`mailto:${listing.email}`} className="text-blue-500 hover:underline">
                  {listing.email}
                </a>
              )}
            </div>
            {/* Website */}
            <div>
              <h3 className="font-bold text-lg text-white">Website:</h3>
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {listing.website}
                </a>
              )}
            </div>
            {/* Companionship Rates */}
            <div>
              <h3 className="font-bold text-lg text-white">Companionship Rates:</h3>
              <ul className="list-disc ml-6 text-white">
                <li>1 hour: ${listing.price}</li>
                <li>2 hours: ${listing.price * 1.5}</li>
                <li>3 hours: ${listing.price * 2}</li>
                <li>Full night: ${listing.price * 3.5}</li>
              </ul>
            </div>
            {/* Additional Info Section */}
            <div>
              <h3 className="font-bold text-xl text-white">Details:</h3>
              <ul className="list-disc ml-6 text-white">
                <li>Category: {listing.category}</li>
                <li>State: {listing.state}</li>
                <li>Location: {listing.location}</li>
                <li>Address: {listing.address}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function setCurrentDateTime(_formatted: string) {
  throw new Error('Function not implemented.');
}
