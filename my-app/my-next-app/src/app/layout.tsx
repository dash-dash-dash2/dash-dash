import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD:my-app/frontend/app/layout.tsx
import Navbar from "./home/Navbar";
import  Sidebar  from "../components/Sidebar";
=======
import { AuthProvider } from '@/context/AuthContext'
import { RestaurantProvider } from '@/context/RestaurantContext'
>>>>>>> 8f228d04579fc5cd064e175c08a372381e1fa872:my-app/my-next-app/src/app/layout.tsx

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< HEAD:my-app/frontend/app/layout.tsx
        {children}
        {/* <Navbar/>
        <Sidebar/> */}
=======
        <AuthProvider>
          <RestaurantProvider>
            {children}
          </RestaurantProvider>
        </AuthProvider>
>>>>>>> 8f228d04579fc5cd064e175c08a372381e1fa872:my-app/my-next-app/src/app/layout.tsx
      </body>
    </html>
  );
}
