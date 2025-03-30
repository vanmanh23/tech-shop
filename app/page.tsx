'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategorySidebar from '@/components/CategorySidebar';

// Mock products data
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
        // Featured - no sorting needed
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={16} />
        <span>Electronics Devices</span>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0">
          <CategorySidebar onPriceChange={handlePriceChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                {filteredProducts.length} items found
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
