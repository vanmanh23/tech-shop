import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0066b2] text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto py-8 md:py-12 px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Subscribe to our newsletter</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Get the latest news and updates from our store.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="bg-white w-full px-4 py-2 sm:rounded-l sm:rounded-none text-gray-800 focus:outline-none rounded"
          />
          <button className="bg-orange-500 text-white px-6 py-2 sm:rounded-r sm:rounded-none flex items-center justify-center rounded">
            SUBSCRIBE
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>

        {/* Brand Logos */}
        <div className="hidden md:flex justify-center items-center gap-8 mt-12 grayscale opacity-70">
          <span className="text-white">Google</span>
          <span className="text-white">Amazon</span>
          <span className="text-white">Philips</span>
          <span className="text-white">Toshiba</span>
          <span className="text-white">Samsung</span>
        </div>

        {/* Mobile Brand Logos */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-8 grayscale opacity-70 flex-wrap">
          <span className="text-white text-sm">Google</span>
          <span className="text-white text-sm">Amazon</span>
          <span className="text-white text-sm">Philips</span>
          <span className="text-white text-sm">Toshiba</span>
          <span className="text-white text-sm">Samsung</span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="text-center sm:text-left">
              <Link href="/" className="text-xl md:text-2xl font-bold mb-4 block">
                CLICON
              </Link>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                (8386) ****-****<br />
                Da Nang, Viet Nam<br />
              </p>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-gray-400 text-sm">24/7 Hotline</span>
                <Link href="/profile" className="text-orange-500 flex items-center text-sm">
                  Browse all Profile <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Top Category */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">TOP CATEGORY</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/computer" className="hover:text-white">Computer & Laptop</Link></li>
                <li><Link href="/smartphone" className="hover:text-white">SmartPhone</Link></li>
                <li><Link href="/headphone" className="hover:text-white">Headphone</Link></li>
                <li><Link href="/accessories" className="hover:text-white">Accessories</Link></li>
                <li><Link href="/camera" className="hover:text-white">Camera & Photo</Link></li>
                <li><Link href="/tv" className="hover:text-white">TV & Homes</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/shop" className="hover:text-white">Shop Product</Link></li>
                <li><Link href="/cart" className="hover:text-white">Shopping Cart</Link></li>
                <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
                <li><Link href="/compare" className="hover:text-white">Compare</Link></li>
                <li><Link href="/track" className="hover:text-white">Track Order</Link></li>
                <li><Link href="/support" className="hover:text-white">Customer Help</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>

            {/* Download App */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">DOWNLOAD APP</h3>
              <div className="space-y-4 text-sm md:text-base">
                <Link href="#" className="block text-white hover:text-gray-200">
                  Google Play Store
                </Link>
                <Link href="#" className="block text-white hover:text-gray-200">
                  Apple App Store
                </Link>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">POPULAR TAG</h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">Game</span>
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">iPhone</span>
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">TV</span>
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">Asus Laptop</span>
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">Macbook</span>
                <span className="px-3 py-1 bg-gray-800 text-xs md:text-sm rounded hover:bg-gray-700 cursor-pointer">SSD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-xs md:text-sm">
          © 2025 eCommerce Template © 2025. Design by Manh Nguyen
        </div>
      </div>
    </footer>
  );
};

export default Footer;