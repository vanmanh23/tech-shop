'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, X, ShoppingCart } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { toast } from 'react-hot-toast';

export default function WishlistContent() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
    toast.success('Product removed from wishlist');
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success('Product added to cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={16} />
        <span>Wishlist</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Image
              src="/empty-wishlist.png"
              alt="Empty Wishlist"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Browse our products and find something you like</p>
          <Link
            href="/electronics"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              {/* Product Image */}
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}