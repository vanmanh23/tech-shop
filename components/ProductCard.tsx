import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  onAddToCart?: (id: number) => void;
  onAddToWishlist?: (id: number) => void;
  onQuickView?: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  isNew,
  isBestSeller,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {isNew && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onAddToWishlist?.(id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Add to Wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              onClick={() => onQuickView?.(id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors"
              title="Quick View"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link href={`/product/${id}`}>
            <h3 className="text-sm text-gray-700 font-medium group-hover:text-blue-600 line-clamp-2 min-h-[40px]">
              {name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                  } fill-current`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({reviews})</span>
          </div>

          {/* Price and Cart */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-900">
              ${price.toFixed(2)}
            </div>
            <button
              onClick={() => onAddToCart?.(id)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 