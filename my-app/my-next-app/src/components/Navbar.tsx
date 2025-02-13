"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${search}`);
    }
  };

  const toggleChoices = () => {
    setShowChoices((prev) => !prev);
  };

  const handleChoiceClick = (choice: string) => {
    setShowChoices(false);
    if (choice === "deliveryman") {
      router.push("/deliveryRegistration");
    } else if (choice === "restaurantOwner") {
      router.push("/restaurantOwner");
    }
  };

  return (
    <>
      {/* Add CSS here */}
      <style jsx>{`
        /* Navbar Container */
        nav.bg-white.shadow-md.py-4.px-6.flex.justify-between.items-center {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        /* Logo */
        a.text-2xl.font-bold.text-red-500 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ef4444; /* Red-500 */
          text-decoration: none;
        }

        /* Search Bar Container */
        form.relative.w-1\/3.hidden.md\:block {
          position: relative;
          width: 400px;
        }

        /* Search Input */
        input.w-full.px-4.py-2.border.rounded-full.focus\:outline-none.focus\:ring-2.focus\:ring-red-400 {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          font-size: 0.875rem;
          border: 1px solid #e5e7eb; /* border-gray-200 */
          border-radius: 9999px; /* rounded-full */
          outline: none;
          background-color: #ffffff;
        }

        /* Search Icon */
        button.absolute.right-3.top-1\/2.transform.-translate-y-1\/2 {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Connection Button */
        a.flex.items-center.bg-red-500.text-white.px-4.py-2.rounded-full.hover\:bg-red-600.transition {
          display: flex;
          align-items: center;
          background-color: #ef4444; /* Red-500 */
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: 9999px; /* rounded-full */
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        a.flex.items-center.bg-red-500.text-white.px-4.py-2.rounded-full.hover\:bg-red-600.transition:hover {
          background-color: #dc2626; /* Red-600 */
        }
      `}</style>

      {/* Navbar JSX */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-red-500">
          🍔 FoodZone
        </a>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-500 w-5 h-5" />
          </button>
        </form>

        {/* Career Dropdown */}
        <div className="relative">
          <button onClick={toggleChoices} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
            Career <ChevronDown className="w-5 h-5 ml-2" />
          </button>
          {showChoices && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={() => handleChoiceClick("deliveryman")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Deliveryman
              </button>
              <button
                onClick={() => handleChoiceClick("restaurantOwner")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Restaurant Owner
              </button>
            </div>
          )}
        </div>

        {/* Connection Button */}
        <a href="/auth" className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
          <User className="w-5 h-5 mr-2" />
          Connect
        </a>
      </nav>
    </>
  );
}