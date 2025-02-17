'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: 'CUSTOMER' | 'DELIVERYMAN' | 'RESTAURANT_OWNER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Add axios interceptor to include token in all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      })
      
      const { token: newToken, user: userData } = response.data
      
      // Store auth data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setToken(newToken)
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      token 
    }}>
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