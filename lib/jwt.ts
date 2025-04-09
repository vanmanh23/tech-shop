import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: number;
}

export async function verifyJwtToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as JwtPayload);
    });
  });
} 

export async function createJwtToken(userId: string) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error('NEXT_PUBLIC_JWT_SECRET is not defined');
  }

  const token = jwt.sign(
    { 
      userId: userId,
      role: 1  
    },
    secret,
    { expiresIn: '7d' }
  );
  return token;
}
