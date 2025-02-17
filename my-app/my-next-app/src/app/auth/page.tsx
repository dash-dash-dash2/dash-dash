"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Credentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, login, logout, isAuthenticated } = useAuth();

  const [credentials, setCredentials] = useState<Credentials>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home/allrestorant");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          phone: credentials.phone || undefined,
          address: credentials.address || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(credentials.email, credentials.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">Welcome to Dish-Dash</h1>
          <p className="text-gray-600">Your favorite food delivery service</p>
        </div>

        <div className="flex space-x-1 bg-yellow-100 p-1 rounded-lg mb-8">
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
              activeTab === "login" ? "bg-yellow-500 text-white shadow" : "text-yellow-700 hover:bg-yellow-200"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
              activeTab === "register" ? "bg-yellow-500 text-white shadow" : "text-yellow-700 hover:bg-yellow-200"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isAuthenticated ? (
          <div>
            <p>Welcome, {user?.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : activeTab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={credentials.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              value={credentials.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={credentials.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={credentials.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              value={credentials.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (Optional)"
              onChange={handleChange}
              value={credentials.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <input
              type="text"
              name="address"
              placeholder="Address (Optional)"
              onChange={handleChange}
              value={credentials.address}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
