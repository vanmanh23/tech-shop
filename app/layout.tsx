import "./globals.css";
// import { Toaster } from 'react-hot-toast';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          {children}
          {/* <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          /> */}
        </body>
      </html>
    );
  }