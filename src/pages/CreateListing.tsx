import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { uploadImage } from '../lib/cloudinary';

const categories = ['Call girl', 'Escort Agency', 'Massage Girls', 'Independent Escorts'];

const states = ['Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'];

const paymentPlans = [
  {
    id: 'free',
    name: 'FREE',
    price: '$0 / month',
    description: 'Perfect for Casual free Postings.',
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '$50 / month',
    description: 'For Regular Postings! 100+ posting with VIP Tab !',
  },
  {
    id: 'team',
    name: 'TEAM',
    price: '$100 / month',
    description: ' For Agency Escorts 1000+ Postings with team !',
  },
];

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  state: string;
  telegramId: string;
  zipCode: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  profileImage: File | null;
  additionalImages: File[];
  services: {
    classicVaginalSex: boolean;
    eroticMassage: boolean;
    masturbation: boolean;
    cumInFace: boolean;
    withTwoMen: boolean;
    cumOnBody: boolean;
    handjob: boolean;
    oralWithoutCondom: boolean;
    duoWithGirl: boolean;
    dirtyTalk: boolean;
    kamasutra: boolean;
    position69: boolean;
    goldenShowerGive: boolean;
    drink: boolean;
  };
  paymentPlan: string;
}

export default function CreateListing() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: categories[0],
    state: states[0],
    telegramId: '',
    zipCode: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    profileImage: null,
    additionalImages: [],
    services: {
      classicVaginalSex: false,
      eroticMassage: false,
      masturbation: false,
      cumInFace: false,
      withTwoMen: false,
      cumOnBody: false,
      handjob: false,
      oralWithoutCondom: false,
      duoWithGirl: false,
      dirtyTalk: false,
      kamasutra: false,
      position69: false,
      goldenShowerGive: false,
      drink: false,
    },
    paymentPlan: 'free',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to create a listing');
      router.push('/login');
      return;
    }

    try {
      let profileImageUrl = '';
      let additionalImageUrls: string[] = [];

      if (formData.profileImage) {
        profileImageUrl = await uploadImage(formData.profileImage);
      }

      if (formData.additionalImages.length > 0) {
        additionalImageUrls = await Promise.all(formData.additionalImages.map(uploadImage));
      }

      const slug = slugify(formData.title).replace(/\s+/g, '-');
      const { error } = await supabase.from('listings').insert([
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          state: formData.state,
          telegram_id: formData.telegramId,
          zip_code: formData.zipCode,
          address: formData.address,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          email: formData.email,
          website: formData.website,
          profile_image: profileImageUrl,
          additional_images: additionalImageUrls,
          status: 'pending',
          user_id: user.id,
          payment_plan: formData.paymentPlan,
        },
      ]);

      if (error) {
        toast.error('Error creating listing');
        console.error(error);
      } else {
        toast.success('Listing created successfully and is pending approval');

        if (formData.paymentPlan !== 'free') {
          const planName = formData.paymentPlan.toUpperCase();
          const message = `I want to upgrade to the ${planName} plan for my listing`;
          const whatsappUrl = `https://wa.me/+447446613550?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }

        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Error uploading images');
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (serviceName: keyof FormData['services']) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceName]: !prev.services[serviceName],
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (e.target.name === 'profileImage') {
      setFormData((prev) => ({
        ...prev,
        profileImage: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...Array.from(files)],
      }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-100 mb-8 text-center">Create New Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg"
      >
        {/* Basic Information */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100">Title</label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-100">Description</label>
              <textarea
                name="description"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Price (AED)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Category</label>
              <select
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100">Phone</label>
              <input
                type="tel"
                name="phone"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Website</label>
              <input
                type="url"
                name="website"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Telegram ID</label>
              <input
                type="text"
                name="telegramId"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.telegramId}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100">State</label>
              <select
                name="state"
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.state}
                onChange={handleChange}
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-100">Address</label>
              <input
                type="text"
                name="address"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-100">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                required
                className="mt-1 block w-full text-gray-100"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Additional Images</label>
              <input
                type="file"
                name="additionalImages"
                accept="image/*"
                multiple
                className="mt-1 block w-full text-gray-100"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.services).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={() => handleServiceChange(key as keyof FormData['services'])}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-2 block text-sm text-gray-100">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Plan */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentPlans.map((plan) => {
              const features = {
                free: ['1 Basic Listing', '24h Visibility', '3 Photos Maximum', 'Basic Support'],
                pro: [
                  '100+ Listings',
                  'VIP Profile Highlight',
                  '10 Photos Per Listing',
                  'Priority Support',
                  'Featured in Top Section',
                  'Analytics Dashboard',
                ],
                team: [
                  '1000+ Listings',
                  'Team Management',
                  '20 Photos Per Listing',
                  '24/7 Priority Support',
                  'Custom Profile Domain',
                  'Advanced Analytics',
                  'Bulk Upload Tools',
                  'Dedicated Account Manager',
                ],
              }[plan.id];

              return (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.paymentPlan === plan.id
                      ? 'border-indigo-600 bg-gray-700'
                      : 'border-gray-600 hover:border-indigo-500'
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, paymentPlan: plan.id }))}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                      <p className="text-2xl font-semibold text-indigo-400 mb-4">{plan.price}</p>
                      <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                      <ul className="space-y-3 mb-6">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-300">
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={plan.id}
                          name="paymentPlan"
                          value={plan.id}
                          checked={formData.paymentPlan === plan.id}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={plan.id}
                          className="ml-2 block text-sm font-medium text-gray-100"
                        >
                          Select {plan.name} Plan
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-max-md flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formData.paymentPlan === 'free' ? 'Create Free Listing' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
