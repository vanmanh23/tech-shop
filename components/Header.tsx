import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Phone, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#0066b2] text-white">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-1 flex justify-between items-center text-sm">
        <div>Welcome to Online store eCommerce store.</div>
        <div className="flex items-center gap-4">
          <span>Follow us</span>
          <div className="flex gap-2">
            <a href="#" className="hover:text-gray-200">FB</a>
            <a href="#" className="hover:text-gray-200">TW</a>
            <a href="#" className="hover:text-gray-200">IG</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            CLICON
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                className="bg-white w-full px-4 py-2 rounded text-gray-800 focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-gray-100 rounded-r">
                <Search className="text-gray-600" size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <span>+1-202-555-0104</span>
            </div>
            <Link href="/cart" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <Link href="/wishlist">
              <Heart size={20} />
            </Link>
            <Link href="/account">
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>All Category</span>
            <ChevronDown size={16} />
          </div>
          <Link href="/shop" className="hover:text-gray-200">Find Shop</Link>
          <Link href="/coupons" className="hover:text-gray-200">Coupons</Link>
          <Link href="/support" className="hover:text-gray-200">Customer Support</Link>
          <Link href="/shipping" className="hover:text-gray-200">Free Shipping</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 