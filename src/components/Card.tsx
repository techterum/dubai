import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiPhoneCall } from 'react-icons/fi';
import { FaCrown, FaWhatsapp } from 'react-icons/fa'; // Import FaWhatsapp
import { MdVerified } from 'react-icons/md';

interface CardProps {
  mainImage: string;
  subImages: string[];
  title: string;
  price: number;
  description: string;
  phone: string;
  payment_plan?: string | null;
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const getCloudinaryUrl = (
  url: string,
  width: number,
  height: number,
  isMobile: boolean = false
): string => {
  const parts = url.split('upload/');
  const quality = isMobile ? 'q_auto:low' : 'q_auto';
  const format = 'f_webp';
  const optimization = isMobile ? 'c_limit,w_400' : 'c_fill';

  return `${parts[0]}upload/${format},${quality},${optimization},w_${width},h_${height}/${parts[1]}`;
};

const getBadgeForPlan = (plan: string | null) => {
  switch (plan?.toLowerCase()) {
    case 'team':
      return (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-yellow-600 px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg z-10">
          <FaCrown className="text-white w-4 h-4" />
          <span className="text-white text-sm font-semibold">VIP</span>
        </div>
      );
    case 'pro':
      return (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-400 to-indigo-600 px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg z-10">
          <MdVerified className="text-white w-4 h-4" />
          <span className="text-white text-sm font-semibold">Verified</span>
        </div>
      );
    default:
      return null;
  }
};

const Card: React.FC<CardProps> = ({
  mainImage,
  subImages,
  title,
  price,
  description,
  phone,
  payment_plan,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const optimizedMainImage = getCloudinaryUrl(
    mainImage,
    isMobile ? 200 : 350,
    isMobile ? 200 : 350,
    isMobile
  );

  const optimizedSubImages = subImages.map((img) =>
    getCloudinaryUrl(img, isMobile ? 50 : 100, isMobile ? 50 : 100, isMobile)
  );

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          href={optimizedMainImage}
          as="image"
          media={isMobile ? '(max-width: 768px)' : undefined}
        />
      </Helmet>
      {/* <div className="w-full h-full max-w-xs mx-auto rounded-lg shadow-lg border border-gray-200 p-4 bg-[#00000091] flex flex-col relative"> */}
      <div className="w-full h-full max-w-xs mx-auto rounded-lg shadow-lg border border-gray-200 p-4 bg-[#EFEDE9]flex flex-col relative">
        {getBadgeForPlan(payment_plan)}

        <div className="flex mb-4">
          <div className="w-3/4 pr-2">
            <img
              className="rounded-lg w-full min-h-[100px] max-h-[200px] object-cover"
              src={optimizedMainImage}
              alt={title}
              width={isMobile ? 200 : 350}
              height={isMobile ? 200 : 350}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="w-1/4 flex flex-col space-y-1">
            {optimizedSubImages.slice(0, 3).map((img, index) => (
              <img
                key={index}
                className="w-full h-16 rounded-lg object-cover"
                src={img}
                alt={`${title} ${index + 1}`}
                width={isMobile ? 50 : 100}
                height={isMobile ? 50 : 100}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            ))}
            {optimizedSubImages.length > 3 && (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg text-sm text-gray-700">
                +{optimizedSubImages.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-black leading-tight text-balance">{title}</h2>
            {payment_plan && (
              <div
                className={`text-xs px-2 py-1 rounded ${
                  payment_plan.toLowerCase() === 'team'
                    ? 'bg-yellow-600/30 text-red'
                    : 'bg-blue-600/30 text-red'
                }`}
              >
                {payment_plan.toUpperCase()}
              </div>
            )}
          </div>

          <p className="text-sm font-semibold text-black mb-2">AED{price}</p>
          <p className="text-sm text-black leading-relaxed flex-grow text-pretty">
            {truncateText(description, 25)}{' '}
            <a
              href="#"
              className="text-blue-500 text-sm flex-wrap hover:underline"
              onClick={handleLinkClick}
            >
              Read more
            </a>
          </p>

          <div className="flex mt-auto pt-3 space-x-5">
            <a
              href={`tel:${phone}`}
              onClick={handleLinkClick}
              className={`${
                payment_plan?.toLowerCase() === 'team'
                  ? 'text-blue-400 hover:text-yellow-300'
                  : payment_plan?.toLowerCase() === 'pro'
                    ? 'text-blue-400 shadow-sm hover:text-red'
                    : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              <FiPhoneCall className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${phone}`}
              onClick={handleLinkClick}
              className={`${
                payment_plan?.toLowerCase() === 'team'
                  ? 'text-green-400 hover:text-yellow-300'
                  : payment_plan?.toLowerCase() === 'pro'
                    ? 'text-green-400 hover:text-blue-300'
                    : 'text-green-400 hover:text-green-300'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-6 h-6" /> {/* Replaced FiMessageSquare with FaWhatsapp */}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Card);
