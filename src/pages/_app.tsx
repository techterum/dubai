import React from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import '../index.css';
import NewsletterSubscription from '../components/NewsletterSubscription';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col main-content">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <NewsletterSubscription />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
