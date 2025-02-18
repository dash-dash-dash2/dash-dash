"use client";

import React from 'react';
import { X, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  score: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt?: string;
}

interface ReviewsPopupProps {
  reviews: Review[];
  onClose: () => void;
}

const ReviewsPopup: React.FC<ReviewsPopupProps> = ({ reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-2xl font-bold text-center mb-6">Customer Reviews</h2>
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border-b border-gray-200 last:border-0 pb-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{review.user.name}</div>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.score ? "fill-current" : "stroke-current"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.createdAt && (
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPopup; 