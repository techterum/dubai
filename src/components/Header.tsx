import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaAngleDown, FaUserCircle } from 'react-icons/fa';
import { WineIcon, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (profile?.username) {
      setDisplayName(profile.username);
    } else if (user?.email) {
      setDisplayName(user.email.split('@')[0]);
    } else {
      setDisplayName('User');
    }
  }, [user, profile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const UserMenu = () => (
    <>
      <Link href="/create-listing">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Post Listing
        </button>
      </Link>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1"
        >
          <FaUserCircle className="h-8 w-8 text-black" />
          <span className="ml-2 font-bold text-white uppercase">{displayName}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <span className="block px-4 py-2 text-sm text-black hover:bg-black-100 border-b border-gray-100 uppercase font-bold">
              {displayName}
            </span>
            <Link href="/dashboard">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Dashboard
              </button>
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );

  const AuthButtons = () => (
    <>
      <Link href="/login">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Post Ad
        </button>
      </Link>
    </>
  );

  return (
    <header className="shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <WineIcon className="h-8 w-8 text-[#654a4e]" />
              <span className="text-xl font-bold text-[#654A4E]">Dubai Escorts</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {user ? <UserMenu /> : <AuthButtons />}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white font-bold hover:text-indigo-600"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#000000b3] backdrop-blur-xl z-40 transition-transform transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4 bg-[#000000b3] backdrop-blur-xl">
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-indigo-600">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-4 py-0 pb-10 bg-black backdrop-blur-xl">
          {user ? (
            <>
              <Link href="/create-listing">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full text-center mx-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Post Listing
                </button>
              </Link>
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1"
              >
                <FaUserCircle className="h-10 w-8 text-white" />
                <span className="ml-4 text-white uppercase">{displayName}</span>
                <FaAngleDown className="ml-1 h-4 w-4 text-black" />
              </button>
              {isDropdownOpen && (
                <div className="w-full px-4 bg-[#000000db]">
                  <span className="block px-4 py-2 text-m text-white border-b border-gray-100 uppercase">
                    {displayName}
                  </span>
                  <Link href="/dashboard">
                    <button
                      className="block px-4 py-2 text-l text-white hover:bg-gray-100"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-l text-white hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full mt-0 px-20 py-10 pt-10 space-y-4 bg-[#000000b3] backdrop-blur-xl">
              <Link href="/login">
                <button
                  className="block w-full text-center bg-indigo-600 text-white hover:text-indigo-600 py-2 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
