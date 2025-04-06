import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for search parameters
const searchParamsSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  brand: z.string().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'name_asc', 'name_desc', 'rating_desc']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    // Get search parameters from URL
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Validate search parameters
    const validatedParams = searchParamsSchema.parse(params);

    // Build where clause for filtering
    const where: any = {
      OR: [
        { name: { contains: validatedParams.query, mode: 'insensitive' } },
        { description: { contains: validatedParams.query, mode: 'insensitive' } },
        { brand: { contains: validatedParams.query, mode: 'insensitive' } },
        { model: { contains: validatedParams.query, mode: 'insensitive' } },
      ],
    };

    // Add category filter if provided
    if (validatedParams.category) {
      where.categoryId = validatedParams.category;
    }

    // Add price range filter if provided
    if (validatedParams.minPrice || validatedParams.maxPrice) {
      where.price = {};
      if (validatedParams.minPrice) {
        where.price.gte = parseFloat(validatedParams.minPrice);
      }
      if (validatedParams.maxPrice) {
        where.price.lte = parseFloat(validatedParams.maxPrice);
      }
    }

    // Add brand filter if provided
    if (validatedParams.brand) {
      where.brand = { contains: validatedParams.brand, mode: 'insensitive' };
    }

    // Set up sorting
    let orderBy: { price?: 'asc' | 'desc' | undefined; name?: 'asc' | 'desc' | undefined; rating?: 'asc' | 'desc' | undefined; } = {};
    if (validatedParams.sortBy) {
      switch (validatedParams.sortBy) {
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        case 'name_asc':
          orderBy = { name: 'asc' };
          break;
        case 'name_desc':
          orderBy = { name: 'desc' };
          break;
        case 'rating_desc':
          orderBy = { rating: 'desc' };
          break;
      }
    }

    // Set up pagination
    const page = parseInt(validatedParams.page || '1');
    const limit = parseInt(validatedParams.limit || '12');
    const skip = (page - 1) * limit;

    // Execute search query
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

interface SearchParams {
  query: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating_desc';
  page?: string;
  limit?: string;
}

export async function searchProducts(params: SearchParams) {
  const searchParams = new URLSearchParams();
  
  // Add required params
  searchParams.append('query', params.query);
  
  // Add optional params if they exist
  if (params.category) searchParams.append('category', params.category);
  if (params.minPrice) searchParams.append('minPrice', params.minPrice);
  if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice);
  if (params.brand) searchParams.append('brand', params.brand);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);

  const response = await fetch(`/api/products/search?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
} 