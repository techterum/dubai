import React, { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin@123';

    if (email === adminEmail && password === adminPassword) {
      toast.success('Login successful');
      // Use a fixed UUID for admin to ensure consistency
      // Set admin ID as null to avoid UUID format issues
      const adminId = null;
      // Store the admin ID in localStorage to persist it
      localStorage.setItem('adminId', 'null');
      setUser({
        id: adminId,
        email,
        user_metadata: { role: 'admin' },
        app_metadata: { provider: 'email' },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      });
      router.push('/admin-dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="bg-black bg-opacity-50 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-600 focus:bg-gray-800 focus:ring-0 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-600 focus:bg-gray-800 focus:ring-0 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
