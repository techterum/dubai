import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import CreateListing from './pages/create-listing';
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin';
import AdminBlogPosts from './pages/AdminBlogPosts';
import BlogPostDetails from './pages/BlogPostDetails';
import { AuthProvider } from './context/AuthContext';
import ListingDetails from './pages/ListingDetails';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col main-content">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/blog-posts" element={<AdminBlogPosts />} />
              <Route path="/blog/:id" element={<BlogPostDetails />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;