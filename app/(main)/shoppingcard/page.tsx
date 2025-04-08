'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash, Loader2 } from 'lucide-react';
import { getShoppingCart } from '@/lib/api/shoppingcart';
import { Cart } from '@prisma/client';
import ShoppingCartSkeleton from '@/components/Skeleton/ShoppingCartSkeleton';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  brand: string;
  processor: string;
  memory: string;
  storage: string;
  model: string;
  display: string;
  color: string | null;
  camera: string | null;
  battery: string | null;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItem extends Cart {
  product: Product;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (typeof window !== 'undefined') {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            setIsLoading(false);
            return;
          }
          const data = await getShoppingCart(userId);
          setCartItems(data);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
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
  const minusQuantity = async (id: string) => {
    try {
      const cartItem = cartItems.find(item => item.id === id);
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === id 
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const plusQuantity = async (id: string) => {
    try {
      const cartItem = cartItems.find(item => item.id === id);
      if (!cartItem) return;
      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const updateCart = async () => {
    try {
      setIsUpdating(true);
      const updateData = cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity
      }));

      const response = await fetch('/api/shoppingcart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Error updating cart');
    } finally {
      setIsUpdating(false);
    }
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
              <div className="col-span-5">PRODUCTS</div>
              <div className="col-span-2 text-right">PRICE</div>
              <div className="col-span-2 text-center">QUANTITY</div>
              <div className="col-span-1 text-center">REMOVE</div>
              <div className="col-span-2 text-right">SUB TOTAL</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-300">
                  <div className="col-span-5 flex gap-4">
                    <div className="w-20 h-20 relative">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm">${item.product.price}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                        onClick={() => minusQuantity(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                        onClick={() => plusQuantity(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                      <Trash size={16} color='red' />
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
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
              <button
                onClick={() => updateCart()}
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isUpdating ? 'Updating...' : 'Update Cart'}
              </button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:w-1/3 border border-gray-300 rounded-lg">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter your district"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your note (optional)"
                    rows={3}
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-4 mt-6">Total Payment</h2>
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