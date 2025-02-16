'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'DRIVER' | 'USER';
  // ... other user properties
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
  isAuthenticated: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage if it exists
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  })
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("User role:", data.user.role);
      setToken(data.token);
      setUser(data.user);

      // Add role-based redirection
      switch (data.user.role) {
        case 'ADMIN':
          router.push('/admin/dashboard');
          break;
        case 'USER':
          router.push('/');
          break;
        case 'DRIVER':
          router.push('/driver');
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null)
      setToken(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const updateUser = (newUserData: User) => {
    setUser(prev => ({ ...prev, ...newUserData }));
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUserData));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  console.log(context)
  return context 
} 