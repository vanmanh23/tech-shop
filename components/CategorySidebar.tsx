import React, { useState } from 'react';
// import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const categories = [
  { id: 1, name: 'Electronics Devices', href: '/electronics', count: 65867 },
  { id: 2, name: 'Computer & Laptop', href: '/computer', count: 45231 },
  { id: 3, name: 'Computer Accessories', href: '/accessories', count: 32145 },
  { id: 4, name: 'SmartPhone', href: '/smartphone', count: 28976 },
  { id: 5, name: 'Headphone', href: '/headphone', count: 15678 },
  { id: 6, name: 'Mobile Accessories', href: '/mobile-accessories', count: 12543 },
  { id: 7, name: 'Gaming Console', href: '/gaming', count: 9876 },
  { id: 8, name: 'Camera & Photo', href: '/camera', count: 8765 },
  { id: 9, name: 'TV & Screen Appliances', href: '/tv', count: 7654 },
  { id: 10, name: 'Watch & Accessories', href: '/watch', count: 6543 },
];

interface CategorySidebarProps {
  onPriceChange?: (min: number, max: number) => void;
  onCategoryChange?: (category: string) => void;
}

const CategorySidebar = ({ onPriceChange, onCategoryChange }: CategorySidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeCategory, setActiveCategory] = useState<number>(1);

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onPriceChange?.(newRange[0], newRange[1]);
  };
  const handleCategoryChange = (categoryname: string, categoryid: number) => {
    setActiveCategory(categoryid);
    onCategoryChange?.(categoryname);
  };
  return (
    <div className="w-72 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">CATEGORY</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.id}>
            <div 
              // href={category.href}
              className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors ${
                activeCategory === category.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              // onClick={() => setActiveCategory(category.id)}
              onClick={() => handleCategoryChange(category.name, category.id)}
            >
              <div className="flex items-center">
                <span>{category.name}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span>({category.count.toLocaleString()})</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Price Range Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-6">PRICE RANGE</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={0}
                max={priceRange[1]}
              />
            </div>
            <span className="text-gray-400">to</span>
            <div className="flex-1">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={priceRange[0]}
                max={10000}
              />
            </div>
          </div>
          
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(priceRange[1] / 1000) * 100}%, #E5E7EB ${(priceRange[1] / 1000) * 100}%, #E5E7EB 100%)`
            }}
          />
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>

          <button
            onClick={() => onPriceChange?.(priceRange[0], priceRange[1])}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar; 