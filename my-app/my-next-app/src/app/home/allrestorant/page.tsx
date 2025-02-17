"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, ChevronDown } from "lucide-react";
import ReviewsPopup from './ReviewsPopup'; // Import the ReviewsPopup component
import Footer from "@/components/Footer";

// Interface for restaurant data
interface RestaurantItem {
  id: string;
  name: string;
  cuisineType: string;
  location: string;
  averageRating: number | { score: number };
  categories?: (string | { name: string })[];
  imageUrl: string;
  ratings?: { score: number; comment?: string; user: { name: string } }[];
  totalRatings?: number;
  latitude: number;
  longitude: number;
}

// RatingPopup component for submitting a new rating
const RatingPopup: React.FC<{ restaurantId: string; onClose: () => void; onRatingAdded: (newRating: any) => void; }> = ({ restaurantId, onClose, onRatingAdded }) => {
  const [score, setScore] = useState<number>(1);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    const response = await fetch(`http://localhost:5000/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({ restaurantId, score, comment }),
    });

    if (response.ok) {
      const newRating = await response.json();
      onRatingAdded(newRating); // Call the function to update the rating in the parent component
      onClose(); // Close the popup
    } else {
      const errorData = await response.json(); // Get error details from the response
      console.error("Failed to submit rating:", errorData);
    }
  };

  return (
    <div className="modal">
      <h2 style={{ textAlign: 'center' }}>Rate this Restaurant</h2>
      <div className="star-rating" style={{ textAlign: 'center' }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setScore(num)}
            style={{ cursor: "pointer", color: num <= score ? "gold" : "gray", fontSize: '24px' }}
          >
            ★
          </span>
        ))}
      </div>
      <label style={{ display: 'block', marginTop: '10px' }}>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', height: '60px', marginTop: '5px' }} />
      </label>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={handleSubmit} style={{ marginRight: '10px' }}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

// Function to render stars based on the rating
const renderStars = (rating: number) => {
  const filledStars = Math.round(rating); // Round the rating to the nearest whole number
  const totalStars = 5; // Total number of stars
  return (
    <span style={{ color: '#ffcc00' }}>
      {'★'.repeat(filledStars)} {/* Filled stars in gold */}
      <span style={{ color: 'gray' }}>{'☆'.repeat(totalStars - filledStars)}</span> {/* Empty stars in gray */}
    </span>
  );
};

// RestaurantCard component with click handler
const RestaurantCard: React.FC<RestaurantItem & { onRatingAdded: (newRating: any) => void; }> = ({
  id,
  name,
  cuisineType,
  location,
  averageRating,
  categories = [],
  imageUrl,
  ratings = [],
  totalRatings = 0,
  latitude,
  longitude,
  onRatingAdded
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false); // State for reviews popup
  const router = useRouter();

  const handleClick = () => {
    if (!showPopup) {
      console.log(`Clicked restaurant ID: ${id}`);
      router.push(`/home/onerestorant/${id}`);
    }
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        padding: "16px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <div style={{ width: "100%", height: "150px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <p style={{ textAlign: "center", padding: "50px 0", color: "#999" }}>No Image Available</p>
        </div>
      )}
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "8px" }}>
        {name}
      </h3>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Cuisine: {cuisineType}
      </p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Location: {location}
      </p>
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "8px" }}>
        Average Rating: {renderStars(typeof averageRating === 'number' ? averageRating : averageRating.score)} ({totalRatings} ratings)
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}>Rate</button>
        <button onClick={(e) => { e.stopPropagation(); setShowReviews(true); }}>Show All Reviews</button> {/* Button to show reviews */}
      </div>
      
      {showPopup && (
        <RatingPopup
          restaurantId={id}
          onClose={() => setShowPopup(false)}
          onRatingAdded={onRatingAdded}
        />
      )}
      {showReviews && (
        <ReviewsPopup
          reviews={ratings} // Pass the ratings as reviews
          onClose={() => setShowReviews(false)}
        />
      )}
    </div>
  );
};

// RestaurantList component to fetch and display restaurants
const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchNearbyRestaurants = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurants/nearby?latitude=${latitude}&longitude=${longitude}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }
        const data = await response.json();
        console.log("Fetched nearby restaurants:", data);
        
        // Fetch ratings for each restaurant
        const restaurantsWithRatings = await Promise.all(data.map(async (restaurant: RestaurantItem) => {
          const ratingsResponse = await fetch(`http://localhost:5000/api/ratings/restaurant/${restaurant.id}`);
          const ratingsData = await ratingsResponse.json();
          const totalRatings = ratingsData.totalRatings || 0; // Get total ratings
          const averageRating = ratingsData.averageRating || 0; // Get average rating
          return { ...restaurant, ratings: ratingsData.ratings, totalRatings, averageRating }; // Add ratings and totals to restaurant data
        }));

        setRestaurants(restaurantsWithRatings);
        setFilteredRestaurants(restaurantsWithRatings); // Initialize filtered restaurants with all restaurants
      } catch (err) {
        console.error("Error fetching nearby restaurants:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    // Get user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchNearbyRestaurants(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to retrieve your location.");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants); // Reset to all restaurants if search query is empty
    }
  };

  const handleRatingAdded = (newRating: any) => {
    // Update the restaurant list with the new rating
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === newRating.restaurantId) {
          const updatedRatings = [...(restaurant.ratings || []), newRating];
          const totalRatings = updatedRatings.length;
          const averageRating = updatedRatings.reduce((acc, curr) => acc + curr.score, 0) / totalRatings;
          return { ...restaurant, ratings: updatedRatings, totalRatings, averageRating }; // Update the restaurant with new rating
        }
        return restaurant;
      })
    );
  };

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar onSearch={handleSearch} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} onRatingAdded={handleRatingAdded} />
        ))}
      </div>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
};

// Navbar component with search functionality
const Navbar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search); // Pass the search query to the parent component
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
        <a href="/home/allrestorant" className="text-2xl font-bold text-red-500">
          🍔 FoodZone
        </a>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-1/3 hidden md:block">
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
};

export default RestaurantList;