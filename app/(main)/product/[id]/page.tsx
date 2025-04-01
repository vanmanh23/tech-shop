'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Plus, Minus, Heart, Share2, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { toast } from 'react-hot-toast';
import { ShopProvider } from '@/context/ShopContext';

// Mock product data
const product = {
  id: 1,
  name: "Apple MacBook Pro with M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage)",
  price: 1099.99,
  rating: 4.5,
  reviews: 2356,
  images: [
    "/products/macbook-1.jpg",
    "/products/macbook-2.jpg",
    "/products/macbook-3.jpg",
    "/products/macbook-4.jpg",
    "/products/macbook-5.jpg",
  ],
  specs: {
    brand: "Apple",
    model: "MacBook Pro",
    processor: "Apple M1 chip",
    memory: "8GB RAM",
    storage: "256GB SSD",
    display: "13.3-inch Retina display",
  },
  description: `
    The Apple M1 chip redefines the 13-inch MacBook Pro. Featuring an 8-core CPU that flies through complex workflows and intensive workloads, the 8-core GPU delivers smooth graphics performance, and a 16-core Neural Engine powers advanced machine learning capabilities.
    
    • Apple M1 chip delivers powerful performance
    • Up to 20 hours of battery life
    • 13.3-inch Retina display with True Tone
    • Active cooling system
    • Studio-quality mics
    • Magic Keyboard with Touch Bar and Touch ID
  `
};

function ProductDetailContent() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    toast.success('Added to cart!');
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(
      isInWishlist(product.id) 
        ? 'Removed from wishlist!'
        : 'Added to wishlist!'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } catch {
        toast.error('Error sharing product');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-2/5">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-50">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 bg-gray-50 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-3/5">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    } fill-current`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews.toLocaleString()} Reviews)
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8">
              <p className="whitespace-pre-line text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold">Key Specifications:</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <Check size={20} />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 border rounded-lg transition-colors ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart
                  size={24}
                  className={isInWishlist(product.id) ? 'fill-current' : ''}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <Share2 size={24} />
              </button>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3">Secure Payment Methods:</h3>
              <div className="flex gap-2">
                <Image src="/payment-icons/visa.png" alt="Visa" width={40} height={25} />
                <Image src="/payment-icons/mastercard.png" alt="Mastercard" width={40} height={25} />
                <Image src="/payment-icons/paypal.png" alt="PayPal" width={40} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <ShopProvider>
      <ProductDetailContent />
    </ShopProvider>
  );
} 