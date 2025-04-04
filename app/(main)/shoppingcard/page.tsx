'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash } from 'lucide-react';
import { getShoppingCart } from '@/lib/api/shoppingcart';
import { Product } from '@prisma/client';
import ShoppingCartSkeleton from '@/components/Skeleton/ShoppingCartSkeleton';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log("userId: ", userId);
        if (!userId) {
          setIsLoading(false);
          return;
        }
        const data = await getShoppingCart(userId);
        console.log("datatata: ", data);
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);
  console.log("cartItems: ", cartItems);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = "Free";
  const discount = 24;
  const tax = 69.99;
  const total = subtotal - discount + tax;
  if(isLoading){
    return (
      <div className="container mx-auto px-4 py-8">
        <ShoppingCartSkeleton />
      </div>
    );
  }
  if(cartItems.length === 0){
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-gray-400">Shopping Cart</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm text-gray-500">
              <div className="col-span-6">PRODUCTS</div>
              <div className="col-span-2 text-right">PRICE</div>
              <div className="col-span-2 text-center">QUANTITY</div>
              <div className="col-span-2 text-center">REMOVE</div>
              <div className="col-span-2 text-right">SUB TOTAL</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-300">
                  <div className="col-span-6 flex gap-4">
                    <div className="w-20 h-20 relative">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm">${item.price}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">1</span>
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                      <Trash size={16} color='red' />
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm">${item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Return to Shop Button */}
            <div className="mt-6 flex justify-between">
              <Link
                href="/electronics"
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              >
                ← RETURN TO SHOP
              </Link>
              <Link
                href="/electronics"
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              >
                Update Cart
              </Link>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:w-1/3 border border-gray-300 rounded-lg">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Card Totals</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Sub-total</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-3 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Coupon Code</h3>
                <input
                  type="text"
                  placeholder="Email address"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Proceed to Checkout Button */}
              <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition-colors">
                PROCEED TO CHECKOUT →
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}