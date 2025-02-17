import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next App',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
      <style jsx global>{`
        body {
          background-color: #f8f9fa;
          font-family: 'Inter', sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </html>
  );
} 