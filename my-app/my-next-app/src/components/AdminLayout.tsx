"use client";

import React from 'react';
import Link from 'next/link';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav className="mt-2">
          <Link href="/admin/users" className="mr-4 hover:underline">Users</Link>
          <Link href="/admin/restaurants" className="mr-4 hover:underline">Restaurants</Link>
          <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout; 