// src/components/DriverLayout.tsx
import { ReactNode } from 'react';


interface DriverLayoutProps {
  children: ReactNode;
}

export default function DriverLayout({ children }: DriverLayoutProps) {
  return (
    <div className="flex min-h-screen">
      
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}