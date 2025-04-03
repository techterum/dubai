import React, { useState } from 'react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    // Mock API call - replace with your actual subscription endpoint
    try {
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulating API response
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#453544] py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-white text-lg md:mr-4">
          Want to receive unblocked domains and the latest listings? Subscribe to our newsletter!
        </div>

        <div className="mt-3 md:mt-0 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 w-full md:w-64 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign up!'}
            </button>
          </form>
          {message && <p className="mt-1 text-sm text-white">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
