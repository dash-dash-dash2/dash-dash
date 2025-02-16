'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'DRIVER' | 'CUSTOMER';
  name: string;
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
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setToken(token)
      setUser(user)

      switch (user.role) {
        case 'ADMIN':
          router.push('/admin/dashboard')
          break
        case 'CUSTOMER':
          router.push('/home/allrestorant')
          break
        case 'DRIVER':
          router.push('/driver')
          break
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    setToken(null)
    router.push('/auth')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser: setUser,
      isAuthenticated: !!user,
      token
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 