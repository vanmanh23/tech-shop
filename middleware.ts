// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { verifyJwtToken } from '@/lib/jwt';

// export async function middleware(request: NextRequest) {
//   // Exclude auth routes
//   if (request.nextUrl.pathname.startsWith('/api/auth')) {
//     return NextResponse.next();
//   }

//   // Get token from cookie or header
//   const token = request.cookies.get('token')?.value || 
//                 request.headers.get('Authorization')?.split(' ')[1];
//   console.log("token: ", token);
//   if (!token) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }

//   // try {
//   //   const payload = await verifyJwtToken(token);
//   //   const requestHeaders = new Headers(request.headers);
//   //   requestHeaders.set('userId', payload.userId);
//   //   requestHeaders.set('userRole', payload.role.toString());

//   //   return NextResponse.next({
//   //     request: {
//   //       headers: requestHeaders,
//   //     },
//   //   });
//   // } catch (error) {
//   //   console.error('Token verification error:', error);
//   //   return NextResponse.json(
//   //     { error: 'Invalid token' },
//   //     { status: 401 }
//   //   );
//   // }
// }

// export async function adminMiddleware(request: NextRequest) {
//   // Kiểm tra nếu route bắt đầu bằng /admin
//   if (request.nextUrl.pathname.startsWith('/admin')) {
//     const token = request.cookies.get('token')?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL('/signin', request.url));
//     }

//     try {
//       const payload = await verifyJwtToken(token);
      
//       // Kiểm tra role
//       if (payload.role !== 0) {
//         return NextResponse.redirect(new URL('/', request.url));
//       }

//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(new URL('/signin', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/:path*', '/admin/:path*']
// }; 


import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    // "/api/auth/:path*",
    "/shoppingcard",
    "/wishlist",
    "/settings",
  ],
};