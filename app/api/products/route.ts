import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createProductSchema } from '@/lib/validations/product';

const prisma = new PrismaClient();

// GET all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: {
        [sort]: order
      },
      skip,
      take: limit
    });

    const total = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate input data
    const validationResult = createProductSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: validationResult.data
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

// // Lấy danh sách sản phẩm
// const getProducts = async (page = 1, limit = 10, search = '') => {
//     const res = await fetch(
//       `/api/products?page=${page}&limit=${limit}&search=${search}`
//     );
//     return res.json();
//   };
  
//   // Tạo sản phẩm mới
//   const createProduct = async (data: any) => {
//     const res = await fetch('/api/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return res.json();
//   };
  
//   // Cập nhật sản phẩm
//   const updateProduct = async (id: string, data: any) => {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return res.json();
//   };
  
//   // Xóa sản phẩm
//   const deleteProduct = async (id: string) => {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'DELETE'
//     });
//     return res.json();
//   };