// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { sendLoginNotification } from "@/lib/mailer";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  debug: true,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
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
    
        // Gửi email thông báo
        await sendLoginNotification(profile.email, profile.name);
        return true;
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


// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// // Mô phỏng DB (bạn sẽ thay bằng truy vấn tới DB thật)
// const mockUsers = [
//   {
//     id: "1",
//     name: "Test User",
//     email: "test@example.com",
//     password: await bcrypt.hash("123456", 10), // mã hoá sẵn
//   },
// ];

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // Tìm user theo email
//         const user = mockUsers.find((u) => u.email === credentials.email);

//         if (!user) return null;

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) return null;
//         console.log("user: ", user);
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
//   callbacks: {
//     async signIn({ account, profile }) {
//       console.log("account: ", account);
//       console.log("profile: ", profile);
//       return true;
//     },
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.sub!;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
