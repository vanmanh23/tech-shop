import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '@prisma/client';
import { getAllCategories } from '@/lib/api/categories';

interface CategorySidebarProps {
  onPriceChange?: (min: number, max: number) => void;
  onCategoryChange?: (category: string) => void;
}

const CategorySidebar = ({ onPriceChange, onCategoryChange }: CategorySidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onPriceChange?.(newRange[0], newRange[1]);
  };
  // const handleCategoryChange = (categoryname: string, categoryid: number) => {
  const handleCategoryChange = ( categoryid: string) => {
    setActiveCategory(categoryid);
    onCategoryChange?.(categoryid);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      setCategories(res);
    }
    fetchCategories();
  }, [])
  return (
    <div className="w-72 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">CATEGORY</h2>
      <ul className="space-y-3">
          <li>
            <div 
              className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors cursor-pointer text-gray-600 hover:bg-gray-50`}
              onClick={() => handleCategoryChange("all")}
            >
              <div className="flex items-center">
                <span>All Products</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </li>
        {categories.map((category) => (
          <li key={category.id}>
            <div 
              className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors cursor-pointer ${
                activeCategory === category.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <div className="flex items-center">
                <span>{category.name}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span>({category._count.products})</span>
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

          {/* <button
            onClick={() => onPriceChange?.(priceRange[0], priceRange[1])}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filter
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar; 