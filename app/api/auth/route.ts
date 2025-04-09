export const dynamic = 'force-dynamic'; 
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: NextRequest ) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      const token = jwt.sign(
        { 
          userId: user?.id,
          role: 1  
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user, token });
    }
    console.log(id);
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        wishlist: {
          include: {
            product: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Transform the response to include wishlist products
    const response = {
      ...user,
      wishlist: user.wishlist.map(item => item.product)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}   