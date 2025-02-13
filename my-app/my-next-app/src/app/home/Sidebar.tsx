"use client"; // Mark this component as a Client Component
import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const sidebarStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
    borderRight: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    transition: 'width 0.3s',
    width: expanded ? '240px' : '70px',
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: '-12px',
    top: '32px',
    zIndex: 10,
    height: '24px',
    width: '24px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    overflow: 'hidden',
    justifyContent: expanded ? 'flex-start' : 'center',
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000000',
  };

  const logoAccentStyle: React.CSSProperties = {
    color: '#FFB800',
  };

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px',
    backgroundColor: '#ffffff',
    color: '#000000',
    transition: 'background-color 0.2s',
  };

  const menuItemHoverStyle: React.CSSProperties = {
    backgroundColor: '#f3f4f6',
  };

  const upgradeBannerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '32px',
    left: '16px',
    right: '16px',
    borderRadius: '12px',
    backgroundColor: '#FFB80010',
    padding: '16px',
  };

  const upgradeButtonStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#FFB800',
    color: '#ffffff',
    padding: '8px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <aside style={sidebarStyle}>
      {/* Toggle Button */}
      <button
        style={toggleButtonStyle}
        onClick={() => setExpanded((curr) => !curr)}
      >
        {expanded ? '<' : '>'}
      </button>

      {/* Logo */}
      <div style={logoStyle}>
        <span style={logoTextStyle}>
          Go<span style={logoAccentStyle}>Meal</span>
          {expanded && '.'}
        </span>
      </div>

      {/* Menu Items */}
      <div style={{ padding: '16px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={menuItemStyle}>
            <span>🏠</span>
            {expanded && <span>Dashboard</span>}
          </li>
          <li style={menuItemStyle}>
            <span>🛍️</span>
            {expanded && <span>Food Order</span>}
          </li>
          <li style={menuItemStyle}>
            <span>❤️</span>
            {expanded && <span>Favorite</span>}
          </li>
          <li style={menuItemStyle}>
            <span>💬</span>
            {expanded && <span>Messages</span>}
          </li>
          <li style={menuItemStyle}>
            <span>📜</span>
            {expanded && <span>Order History</span>}
          </li>
          <li style={menuItemStyle}>
            <span>🧾</span>
            {expanded && <span>Bills</span>}
          </li>
          <li style={menuItemStyle}>
            <span>⚙️</span>
            {expanded && <span>Setting</span>}
          </li>
        </ul>
      </div>

      {/* Upgrade Banner */}
      {expanded && (
        <div style={upgradeBannerStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Upgrade your Account to Get Free Voucher
          </h3>
          <button style={upgradeButtonStyle}>Upgrade</button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;