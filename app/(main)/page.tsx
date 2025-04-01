'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategorySidebar from '@/components/CategorySidebar';

const products = [
  {
    id: 1,
    name: "POCO X5 Pro 5G Global Version",
    price: 299.99,
    image: "/products/phone-1.jpg",
    rating: 4.5,
    reviews: 1234,
    isNew: true,
  },
  {
    id: 2,
    name: "Samsung 34-inch Ultra WQHD Monitor",
    price: 449.99,
    image: "/products/monitor-1.jpg",
    rating: 4.8,
    reviews: 856,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 349.99,
    image: "/products/headphone-1.jpg",
    rating: 4.7,
    reviews: 2341,
  },
  {
    id: 4,
    name: "DJI Mini 2 SE Drone",
    price: 299.99,
    image: "/products/drone-1.jpg",
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 5,
    name: "Lenovo Legion Pro 5",
    price: 1299.99,
    image: "/products/laptop-1.jpg",
    rating: 4.9,
    reviews: 432,
    isNew: true,
  },
  {
    id: 6,
    name: "ASUS ROG Swift 27-inch Gaming Monitor",
    price: 699.99,
    image: "/products/monitor-2.jpg",
    rating: 4.7,
    reviews: 765,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/products/phone-2.jpg",
    rating: 4.8,
    reviews: 1543,
    isNew: true,
  },
  {
    id: 8,
    name: "Apple MacBook Air M2",
    price: 1099.99,
    image: "/products/laptop-2.jpg",
    rating: 4.9,
    reviews: 2134,
    isBestSeller: true,
  }
];

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePriceChange = (min: number, max: number) => {
    setFilteredProducts(
      products.filter(product => product.price >= min && product.price <= max)
    );
  };

  const handleSort = (option: string) => {
    setSortOption(option);
    let sorted = [...filteredProducts];
    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = products;
    }
    setFilteredProducts(sorted);
  };

  const handleAddToCart = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const handleAddToWishlist = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const handleQuickView = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const handleCategoryChange = (category: string) => {
    console.log(selectedCategory);
    setSelectedCategory(category);
    // setFilteredProducts(products.filter(product => product.category === category));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={16} />
        <span>Electronics Devices</span>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center justify-between"
        >
          <span>Filters</span>
          <ChevronRight
            size={20}
            className={`transform transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop & Mobile */}
        <div className={`
          fixed lg:static inset-0 z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:w-72 flex-shrink-0
        `}>
          <div className="lg:block bg-white h-full lg:h-auto p-4 lg:p-0">
            {/* Close button for mobile */}
            <div className="flex justify-end mb-4 lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <CategorySidebar onPriceChange={handlePriceChange} onCategoryChange={handleCategoryChange} />
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-600">
                {filteredProducts.length} items found
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-gray-600 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="flex-1 sm:flex-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onQuickView={handleQuickView}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
