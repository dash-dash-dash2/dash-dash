"use client"; // ✅ Mark this file as a Client Component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { ChatProvider } from "@/context/ChatContext";
import { OrderProvider } from "@/context/OrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ChatProvider>
            <OrderProvider>
              <RestaurantProvider>{children}</RestaurantProvider>
            </OrderProvider>
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
