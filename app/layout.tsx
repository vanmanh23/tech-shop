import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
// import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: 'Tech Shop',
  description: 'Your one-stop shop for all tech needs',
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          <Providers>
          {children}
          <Toaster position="bottom-right" />
          </Providers>
        </body>
      </html>
    );
  }