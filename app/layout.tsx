// import { Inter } from 'next/font/google';
// import type { Metadata } from 'next';
// import './globals.css';

// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter'
// });

// export const metadata: Metadata = {
//   title: 'Tech Shop',
//   description: 'Your one-stop shop for all tech needs',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={inter.variable}>
//       <body className="font-sans">
//         {children}
//       </body>
//     </html>
//   );
// }


import "./globals.css";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          {children}
        </body>
      </html>
    );
  }