export const dynamic = 'force-dynamic';

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { sendLoginNotification } from "@/lib/mailer";
import { PrismaClient } from '@prisma/client';

// Use a singleton pattern for PrismaClient to prevent connection issues in serverless environments
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });
    
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                password: "",
                role: 1,
              },
            });
          }
    
          // Try to send email notification, but don't fail if it doesn't work
          try {
            await sendLoginNotification(profile.email, profile.name);
          } catch (emailError) {
            console.error("Failed to send login notification:", emailError);
            // Continue with login even if email fails
          }
          
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          // Still allow sign in even if database operations fail
          return true;
        }
      }
    
      return false;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
