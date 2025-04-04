import React from 'react';

const WishlistSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="h-48 bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            
            {/* Price skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            
            {/* Buttons skeleton */}
            <div className="flex justify-between">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-10"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSkeleton; 