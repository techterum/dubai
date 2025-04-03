import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { Wine } from 'lucide-react';
import Image from 'next/image';
import RegisterIcon from '../assets/register_icon.png';
import RegisterIcon2 from '../assets/register_icon2.png';

const supabase = createClientComponentClient();

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: 'url(/path/to/background-image.jpg)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sign In Card */}
        <div className="col-span-1 max-w-md w-full mx-auto bg-opacity-50 bg-gray-800 p-10 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-6">
            <Wine className="h-20 w-20 text-indigo-600" />
          </div>
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
              Sign in to your account
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* Register User Card */}
        <div className="col-span-1 max-w-xs w-full mx-auto bg-opacity-50 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <Image src={RegisterIcon2} alt="User" width={120} height={120} className="h-30 w-30" />
          </div>
          <div>
            <h2 className="text-center text-xl font-extrabold text-gray-100">USER</h2>
            <p className="text-center text-sm text-gray-100 mt-2">
              Keep updated on activity in your area!
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/Register')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </div>

        {/* Register Advertiser Card */}
        <div className="col-span-1 max-w-xs w-full mx-auto bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <Image
              src={RegisterIcon}
              alt="Advertiser"
              width={120}
              height={120}
              className="h-30 w-30"
            />
          </div>
          <div>
            <h2 className="text-center text-xl font-extrabold text-gray-100">ADVERTISER</h2>
            <p className="text-center text-sm text-gray-100 mt-2">Get listed for free today!</p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/Register')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
