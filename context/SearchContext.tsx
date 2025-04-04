'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchParams: {
    query: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating_desc';
    page?: string;
    limit?: string;
  };
  setSearchParams: (params: any) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: '1',
    limit: '12',
  });

  const clearSearch = () => {
    setSearchParams({
      query: '',
      page: '1',
      limit: '12',
    });
  };

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 