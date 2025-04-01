import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: number;
}

export async function verifyJwtToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as JwtPayload);
    });
  });
} 