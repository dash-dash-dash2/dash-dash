"use client";

import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RatingPopupProps {
  restaurantId: string;
  onClose: () => void;
  onRatingAdded: (newRating: any) => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ restaurantId, onClose, onRatingAdded }) => {
  const [score, setScore] = useState<number>(0);
  const [hoveredScore, setHoveredScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ restaurantId, score, comment }),
      });

      if (response.ok) {
        const newRating = await response.json();
        onRatingAdded(newRating);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit rating:", errorData);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-2xl font-bold text-center mb-6">Rate this Restaurant</h2>
        
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onMouseEnter={() => setHoveredScore(value)}
              onMouseLeave={() => setHoveredScore(0)}
              onClick={() => setScore(value)}
              className="transform transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  value <= (hoveredScore || score)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>

        <Textarea
          placeholder="Share your experience (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-6"
        />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleSubmit}
            disabled={score === 0}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup; 