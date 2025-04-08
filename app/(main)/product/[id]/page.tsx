'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Plus, Minus, Heart, Share2, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { toast } from 'react-hot-toast';
// import { ShopProvider } from '@/context/ShopContext';
import { useParams } from 'next/navigation';
import { Product } from '@prisma/client';
import { getProductById } from '@/lib/api/products';

export default function ProductDetailContent() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        if (isMounted) {
          toast.error('Failed to load product');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);
  console.log("product", product);
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

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
      isInWishlist(product?.id) 
        ? 'Removed from wishlist!'
        : 'Added to wishlist!'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description || '',
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
          <div className="lg:w-2/5">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-50">
              <Image
                src={product?.images[selectedImage]}
                alt={product?.name}
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 bg-gray-50 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} view ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(4) ? 'text-yellow-400' : 'text-gray-300'
                    } fill-current`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product?.reviews?.toLocaleString()} Reviews)
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {product?.name}
            </h1>

            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product?.price?.toFixed(2)}
            </div>

            <div className="prose prose-sm max-w-none mb-8">
              <p className="whitespace-pre-line text-gray-600">
                {product?.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold">Key Specifications:</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* {Object.entries(product || {}).map(([key, value]) => ( */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Brand :</span>
                      <span className="font-medium  truncate max-w-[200px] block">{product?.brand}</span>              
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Memory :</span>
                      <span className="font-medium truncate max-w-[200px] block">{product?.memory}</span>              
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Processor :</span>
                      <span className="font-medium truncate max-w-[200px] block">{product?.processor}</span>              
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Storage :</span>
                      <span className="font-medium truncate max-w-[200px] block">{product?.storage}</span>              
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Model :</span>
                      <span className="font-medium truncate max-w-[200px] block">{product?.model}</span>              
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 capitalize">Display :</span>
                      <span className="font-medium truncate max-w-[200px] block">{product?.display}</span>              
                    </div>
                  </div>
                {/* ))} */}
            </div>

            <div className="flex xl:flex-row 2xl:flex-row md:flex-row sm:flex-row flex-col items-center gap-6 mb-8">
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
                  isInWishlist(product?.id)
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart
                  size={24}
                  className={isInWishlist(product?.id) ? 'fill-current' : ''}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <Share2 size={24} />
              </button>
            </div>

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

// export default function ProductDetail() 
//   return (
//     <ShopProvider>
//       <ProductDetailContent />
//     </ShopProvider>
//   );
// } 