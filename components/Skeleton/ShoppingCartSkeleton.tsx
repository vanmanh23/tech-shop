import React from 'react';

const ShoppingCartSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Cart Items Skeleton */}
      <div className="lg:w-2/3">
        {/* Table Header Skeleton */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm text-gray-500">
          <div className="col-span-6">PRODUCTS</div>
          <div className="col-span-2 text-right">PRICE</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-right">SUB TOTAL</div>
        </div>

        {/* Cart Items Skeleton */}
        <div className="space-y-4 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-300 animate-pulse">
              <div className="col-span-6 flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Totals Skeleton */}
      <div className="lg:w-1/3">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSkeleton; 