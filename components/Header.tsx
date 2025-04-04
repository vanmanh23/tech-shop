'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Phone, ChevronDown, Facebook, Twitter, Instagram, Menu, X, Settings, LogIn, UserPlus, LogOut  } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShop } from '@/context/ShopContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchParams, setSearchParams } = useSearch();
  const [searchText, setSearchText] = useState('');
  const { totalItems } = useShop();
const token = localStorage.getItem('access_token');
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchParams({ ...searchParams, query: searchText });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };
  return (
    <header className="bg-[#0066b2] text-white pt-2">
      {/* Top bar - Hidden on mobile */}
      <div className="hidden md:block container mx-auto px-4 py-1">
        <div className="flex justify-between items-center text-sm">
          <div>Welcome to Online store eCommerce store.</div>
          <div className="flex items-center gap-4">
            <span>Follow us</span>
            <div className="flex gap-2">
              <a href="#" className="hover:text-gray-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-gray-200">
                <Twitter size={18}/>
              </a>
              <a href="#" className="hover:text-gray-200">
                <Instagram size={18}/>
              </a>
            </div>
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

          {/* Search bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-white w-full px-4 py-2 rounded text-gray-800 focus:outline-none"
              />
              <button 
                onClick={() => setSearchParams({ ...searchParams, query: searchText })}
                className="absolute right-0 top-0 h-full px-4 bg-gray-100 rounded-r cursor-pointer"
              >
                <Search className="text-gray-600" size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            {/* Phone - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Phone size={20} />
              <span>+1-202-555-0104</span>
            </div>
            <Link href="/shoppingcard" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </Link>
            <Link href="/wishlist">
              <Heart size={20} />
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <User size={20} className="hover:text-gray-200 transition-colors" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {
                  !token && (
                    <>
                    <DropdownMenuItem className="cursor-pointer">
                  <Link href="/signin" className="flex items-center w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/signup" className="flex items-center w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </DropdownMenuItem>
                </>
                  )
                }
               
                
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/shoppingcard" className="flex items-center w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Shopping Cart</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                 {
                  token && (
                    <DropdownMenuItem className="cursor-pointer">
                  <div onClick={handleSignOut} className="flex items-center w-full">
                    <LogOut  className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </div>
                </DropdownMenuItem>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 mt-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>All Category</span>
            <ChevronDown size={16} />
          </div>
          <Link href="/shop" className="hover:text-gray-200">Find Shop</Link>
          <Link href="/coupons" className="hover:text-gray-200">Coupons</Link>
          <Link href="/contact" className="hover:text-gray-200">Customer Support</Link>
          <Link href="/shipping" className="hover:text-gray-200">Free Shipping</Link>
        </nav>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white w-full px-4 py-2 rounded text-gray-800 focus:outline-none"
            />
            <button 
              onClick={() => setSearchParams({ ...searchParams, query: searchText })}
              className="absolute right-0 top-0 h-full px-4 bg-gray-100 rounded-r cursor-pointer"
            >
              <Search className="text-gray-600" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-gray-800">
                <Phone size={20} />
                <span>+1-202-555-0104</span>
              </div>
              <div className="border-t pt-4 space-y-2">
                <Link href="/shop" className="block text-gray-800 hover:text-blue-600">Find Shop</Link>
                <Link href="/coupons" className="block text-gray-800 hover:text-blue-600">Coupons</Link>
                <Link href="/contact" className="block text-gray-800 hover:text-blue-600">Customer Support</Link>
                <Link href="/shipping" className="block text-gray-800 hover:text-blue-600">Free Shipping</Link>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-gray-800">
                  <span>Follow us</span>
                  <div className="flex gap-2">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Twitter size={18}/>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Instagram size={18}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 