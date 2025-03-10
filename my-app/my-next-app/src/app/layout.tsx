import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { RestaurantProvider } from '../context/RestaurantContext';
import { ChatProvider } from '../context/ChatContext';
import { OrderProvider } from '../context/OrderContext';
import { Inter } from 'next/font/google';
import React from 'react';
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "My Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <AuthProvider>
          <RestaurantProvider>
            <OrderProvider>
              <ChatProvider>
                {children}
              </ChatProvider>
            </OrderProvider>
          </RestaurantProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
