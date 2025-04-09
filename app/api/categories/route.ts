export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { createCategorySchema } from '@/lib/validations/category';

const prisma = new PrismaClient();

// GET /api/categories
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: Prisma.CategoryWhereInput = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    };

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        include: {
          _count: {
            select: { products: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.category.count({ where })
    ]);

    return NextResponse.json({
      categories,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(req: Request) {
  try {
      const data = await req.json();
    const validationResult = createCategorySchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, slug, description, image } = validationResult.data;

    // Check if slug is unique
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image
      },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 