import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const products = await prisma.cart.findMany({
      where: {
        userId: userId
      },
      include: {
        product: true
      }
    });

    return NextResponse.json(products.map(item => item.product));
  } catch (error) {
    console.error('Error fetching shopping cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { productId, userId } = data;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const existingCart = await prisma.cart.findFirst({
      where: {
        userId,
        productId
      }
    });

    if (existingCart) {
      return NextResponse.json({ message: 'Product already in shopping cart', status: 400 });
    }

    await prisma.cart.create({
      data: {
        userId,
        productId
      }
    });

    return NextResponse.json({ message: 'Product added to shopping cart', status: 200 });
  } catch (error) {
    console.error('Error adding to shopping cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await prisma.wishlist.deleteMany({
      where: {
        productId,
        userId
      }
    });

    return NextResponse.json({ message: 'Product removed from shopping cart', status: 200 });
  } catch (error) {
    console.error('Error removing from shopping cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 