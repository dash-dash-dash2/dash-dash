'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

interface User {
  id?: string
  email?: string
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      // Implement your login logic here
      // Example:
      // const response = await signInWithEmailAndPassword(email, password)
      // setUser(response.user)
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      setUser({ email, id: '1' }) // Temporary mock
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Implement your logout logic here
      setUser(null)
      setToken(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, token }}>
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