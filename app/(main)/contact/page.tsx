'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function CustomerSupport() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen p-10 rounded-2xl">
      {/* Contact Form Section */}
      <div className="w-1/2 bg-[#363B4E] p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8">CONTACT US</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-purple-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-32 bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="w-1/2 bg-white p-12 flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          {/* Background Elements */}
          <div className="absolute right-0 top-0">
            <div className="flex items-center gap-2">
              <div className="w-12 h-16 bg-yellow-400 rounded-md" />
              <div className="w-12 h-16 bg-purple-400 rounded-md" />
            </div>
          </div>
          
          {/* Main Illustration */}
          <div className="relative z-10">
            <div className="bg-purple-100 p-8 rounded-lg mb-4 w-64">
              <p className="text-gray-600">Hi! How can we help you today?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-200 rounded-full" />
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-2 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0">
            <div className="w-16 h-16 bg-yellow-200 rounded-full" />
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-purple-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
