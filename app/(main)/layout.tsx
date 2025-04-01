import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </ShopProvider>
      </body>
    </html>
  );
} 