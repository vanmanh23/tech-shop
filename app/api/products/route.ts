import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createProductSchema } from '@/lib/validations/product';

const prisma = new PrismaClient();

// GET /api/products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        },
        categoryId ? { categoryId } : {}
      ]
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          wishlist: true
        },
        orderBy: {
          [sort]: order
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("data: ",data);
    const validationResult = createProductSchema.safeParse(data);
    console.log("validationResult: ",validationResult);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, price, images, description, categoryId, isNew, isBestSeller, brand, processor, memory, storage, model, display } = validationResult.data;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        images,
        description,
        categoryId : categoryId || undefined,
        isNew,
        isBestSeller,
        brand,
        processor,
        memory,
        storage,
        model,
        display
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Lấy danh sách sản phẩm
// export const getProducts = async (page = 1, limit = 10, search = '') => {
//     const res = await fetch(
//       `/api/products?page=${page}&limit=${limit}&search=${search}`
//     );
//     return res.json();
//   };
  
//   // Tạo sản phẩm mới
//   export const createProduct = async (data: any) => {
//     const res = await fetch('/api/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return res.json();
//   };
  
//   // Cập nhật sản phẩm
//   export const updateProduct = async (id: string, data: any) => {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return res.json();
//   };
  
//   // Xóa sản phẩm
//   export const deleteProduct = async (id: string) => {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'DELETE'
//     });
//     return res.json();
//   };