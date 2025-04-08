export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signInSchema } from '@/lib/validations/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validationResult = signInSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error' },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;
    // const { email, password } = await req.json()
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role  // Thêm role vào token
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    // Tạo response với cookie
    const response = NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        token: token
      }
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return response;
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 