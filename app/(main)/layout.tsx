import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from '@/context/SearchContext';
import { WishlistProvider } from '@/context/WishlistContext';
// import { SessionProvider } from "next-auth/react";
import {Providers} from "@/app/providers";

export const metadata: Metadata = {
  title: "Tech Shop - Your Ultimate Electronics Store",
  description: "Find the latest electronics, gadgets, and tech accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      {/* <body className={inter.className}> */}
      <body>
        <ShopProvider>
          <SearchProvider>
            <WishlistProvider>
              <Providers>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main  className="flex-1 bg-gray-50">
                  {children}
                </main>
                <Footer />
              </div>
              </Providers>
              <Toaster position="bottom-right" />
            </WishlistProvider>
          </SearchProvider>
        </ShopProvider>
      </body>
    </html>
  );
} 