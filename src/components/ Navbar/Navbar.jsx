import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  // State to toggle mobile search input visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="navbar">
      {/* 1. Brand Logo aur Title (Hide when search is open on mobile to save space) */}
      <div className={`navbar__brand ${isSearchOpen ? 'navbar__brand--hidden' : ''}`}>
        <div className="navbar__logo">T</div>
        <span className="navbar__title">TaskFlow</span>
      </div>

      {/* 2. Search Bar (Desktop par hamesha dikhega, mobile par state ke hisab se toggle hoga) */}
      <div className={`navbar__search ${isSearchOpen ? 'navbar__search--active' : ''}`}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks, projects..."
          aria-label="Search tasks"
          autoFocus={isSearchOpen}
        />
        {/* Mobile par search band karne ke liye close button */}
        {isSearchOpen && (
          <button 
            className="navbar__search-close" 
            onClick={() => setIsSearchOpen(false)}
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {/* 3. Right Side Actions (Search icon for mobile, Notifications & Profile) */}
      <div className={`navbar__actions ${isSearchOpen ? 'navbar__actions--hidden' : ''}`}>
        {/* Mobile search toggle button */}
        <button 
          className="navbar__search-toggle" 
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open Search"
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <button className="navbar__notification" aria-label="Notifications" type="button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span className="navbar__dot"></span>
        </button>

        <div className="navbar__profile">
          <div className="navbar__avatar">BK</div>
          <div className="navbar__user">
            <span className="navbar__name">Bilal Khan</span>
            <span className="navbar__role">Member</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;