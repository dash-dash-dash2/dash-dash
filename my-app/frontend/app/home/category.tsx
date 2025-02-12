"use client"; // Mark this component as a Client Component
import React from 'react';

const Category: React.FC = () => {
  const categorySectionStyle: React.CSSProperties = {
    marginBottom: '32px',
  };

  const categoryHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const categoryTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const viewAllLinkStyle: React.CSSProperties = {
    color: '#FFB800',
    fontSize: '14px',
    textDecoration: 'none',
  };

  const categoryListStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '16px',
  };

  const categoryItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    padding: '16px',
    transition: 'background-color 0.2s, color 0.2s',
    cursor: 'pointer',
  };

  const categoryItemHoverStyle: React.CSSProperties = {
    backgroundColor: '#FFB800',
    color: '#ffffff',
  };

  const categoryIconStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '8px',
  };

  const categoryNameStyle: React.CSSProperties = {
    fontSize: '14px',
  };

  return (
    <section style={categorySectionStyle}>
      {/* Category Header */}
      <div style={categoryHeaderStyle}>
        <h2 style={categoryTitleStyle}>Category</h2>
        <a href="#" style={viewAllLinkStyle}>
          View all
        </a>
      </div>

      {/* Category List */}
      <div style={categoryListStyle}>
        {[
          { id: 1, name: 'Fast Food', icon: '🍔' },
          { id: 2, name: 'Pizza', icon: '🍕' },
          { id: 3, name: 'Sushi', icon: '🍣' },
          { id: 4, name: 'Desserts', icon: '🍩' },
        ].map((category) => (
          <button
            key={category.id}
            style={categoryItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFB800';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
          >
            <span style={categoryIconStyle}>{category.icon}</span>
            <span style={categoryNameStyle}>{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Category;