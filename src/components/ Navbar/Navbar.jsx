import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ onToggleSidebar }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Left Side: Hamburger menu (mobile) & Search Bar (desktop/mobile active) */}
      <div className="navbar__left">
        <button
          className="navbar__menu-toggle"
          onClick={() => {
            console.log("Hamburger clicked!");
            onToggleSidebar();
          }}
          aria-label="Toggle Sidebar"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Search Bar on Left Side */}
        <div className={`navbar__search ${isSearchOpen ? 'navbar__search--active' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search tasks, projects..."
            aria-label="Search tasks"
            autoFocus={isSearchOpen}
          />
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
      </div>

      {/* Right Side: Search Icon (Mobile), Notification Icon, and User Icon */}
      <div className={`navbar__actions ${isSearchOpen ? 'navbar__actions--hidden' : ''}`}>
        <button
          className="navbar__search-toggle"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open Search"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <button className="navbar__notification" aria-label="Notifications" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span className="navbar__dot"></span>
        </button>

        <button className="navbar__user-icon-btn" aria-label="User Profile" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;