'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getWishlist } from '@/lib/api/products';
import WishlistSkeleton from '@/components/Skeleton/WishlistSkeleton';
import ProductCard from '@/components/ProductCard';
import { Product } from '@prisma/client';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (typeof window !== 'undefined') {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            setIsLoading(false);
            return;
          }
          const data = await getWishlist(userId);
          setWishlist(data);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <WishlistSkeleton />
      </div>
    );
  }
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="text-center py-12">
          <p className="text-gray-600">Your wishlist is empty</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={16} />
        <span>Wishlist</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            rating={product.rating}
            reviews={product.reviews}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
}