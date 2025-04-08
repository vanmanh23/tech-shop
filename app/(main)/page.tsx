'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategorySidebar from '@/components/CategorySidebar';
import SidebarSkeleton from '@/components/Skeleton/SidebarSkeleton';
import ProductCardSkeleton from '@/components/Skeleton/ProductCardSkeleton';
import { getProductsByCategoryId } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { Product } from '@prisma/client';
import { useSearch } from '@/context/SearchContext';
import { useShop } from '@/context/ShopContext';
import Pagination from '@/components/Pagination';

export default function Home() {
  const { searchParams } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [lengthProducts, setLengthProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(1000);
  const handlePriceChange = (min: number, max: number) => {
    setFilteredProducts(
      products.filter(product => product.price >= min && product.price <= max)
    );
  };
  const { getTotalItems } = useShop();

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

  const handleAddToCart = (productId: string) => {
    window.location.href = `/product/${productId}`;
  };

  const handleAddToWishlist = (productId: string) => {
    window.location.href = `/product/${productId}`;
  };

  const handleQuickView = (productId: string) => {
    window.location.href = `/product/${productId}`;
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory === "all") {
        setIsLoading(true);
        const res = await getProducts(1);
        setCurrentPage(1);
        setProducts(res.products);
        setFilteredProducts(res.products);
        if (res.length === 0) {
          setLengthProducts(0);
        } else {
          setLengthProducts(res.products.length);
        }
        setSelectedCategory("");
        setIsLoading(false);
        return;
      } 
      const res = await getProductsByCategoryId(selectedCategory);
      setFilteredProducts(res);
      setProducts(res);
      if (res.length === 0) {
        setLengthProducts(0);
      } else {
        setLengthProducts(res.length);
      }
    }
    fetchProductsByCategory();
  }, [selectedCategory]);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('userId', data.userId);
        })
        .catch(error => {
          console.error("Error verifying token:", error);
        });
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getProducts(currentPage);
        // setProducts(res);
        // setFilteredProducts(res);
        setTotalPages(res.totalPages);
        setCurrentPage(res.page);
        setProducts(res.products);
        setFilteredProducts(res.products);
        if (res.length === 0) {
          setLengthProducts(0);
        } else {
          // setLengthProducts(res.length);
          setLengthProducts(res.products.length);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    // getTotalItems();
    fetchProducts();
  }, [currentPage]);
  getTotalItems();
  useEffect(() => {
    const fetchProductsBySearch = async () => {
      const response = await fetch(`/api/products/search?${new URLSearchParams(searchParams).toString()}`);
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      if (data?.products?.length === 0) {
        setLengthProducts(0);
      } else {
        setLengthProducts(data?.products?.length || 0);
      }
    }
    fetchProductsBySearch();
  }, [searchParams])

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
            {isLoading ? (
              <SidebarSkeleton />
            ) : (
              <CategorySidebar 
                onPriceChange={handlePriceChange} 
                onCategoryChange={handleCategoryChange} 
              />
            )}
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
                {lengthProducts} items found
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
                  {/* <option value="rating">Best Rating</option> */}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              // Show skeleton loading for products
              [...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              // Show actual products
              filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  rating={4}
                  image={product.images[0]}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onQuickView={handleQuickView}
                />
              ))
            )}
          </div>

          {/* Empty State */}
          {!isLoading && (lengthProducts === 0 || filteredProducts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center items-center'>
          <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      
    </div>
  );
}
