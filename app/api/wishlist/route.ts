export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

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

    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: userId
      },
      include: {
        product: true
      }
    });

    return NextResponse.json(wishlist.map(item => item.product));
  } catch (error) {
    console.error('Error fetching wishlist:', error);
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

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if product is already in wishlist
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        userId,
        productId
      }
    });

    if (existingWishlist) {
      return NextResponse.json({ message: 'Product already in wishlist' });
    }

    // Add product to wishlist
    await prisma.wishlist.create({
      data: {
        userId,
        productId
      }
    });

    return NextResponse.json({ message: 'Product added to wishlist', status: 200 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
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

    return NextResponse.json({ message: 'Product removed from wishlist', status: 200 });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 