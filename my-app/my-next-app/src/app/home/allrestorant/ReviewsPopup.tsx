import React from 'react';

interface Review {
  score: number;
  comment: string;
  user: { name: string };
}

interface ReviewsPopupProps {
  reviews: Review[];
  onClose: () => void;
}

const ReviewsPopup: React.FC<ReviewsPopupProps> = ({ reviews, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={headerStyle}>Reviews</h2>
        <button onClick={onClose} style={closeButtonStyle}>✖</button>
        {reviews.length === 0 ? (
          <p style={noReviewsStyle}>No reviews available.</p>
        ) : (
          <ul style={listStyle}>
            {reviews.map((review, index) => (
              <li key={index} style={listItemStyle}>
                <strong>{review.user.name}</strong>: {review.comment} <br />
                <span style={ratingStyle}>{'★'.repeat(review.score)}{'☆'.repeat(5 - review.score)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Styles for the modal and backdrop
const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  maxWidth: '600px',
  width: '90%', // Responsive width
  maxHeight: '80%', // Limit height
  overflowY: 'auto', // Scroll if content exceeds max height
  transition: 'transform 0.3s ease, opacity 0.3s ease',
};

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  zIndex: 999, // Behind the modal
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#999',
};

const noReviewsStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#999',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '15px',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
};

const ratingStyle: React.CSSProperties = {
  color: '#ffcc00',
};

export default ReviewsPopup; 