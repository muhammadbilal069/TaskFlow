import React from 'react';
import { FiGrid, FiCheckSquare, FiColumns, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile background overlay */}
      {isOpen && <div className="sidebar__overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        
        {/* Brand Logo & Name */}
           <div className="sidebar__brand">
          <div className="sidebar__brand-group">
            <div className="sidebar__logo">T</div>
            <span className="sidebar__title">TaskFlow</span>
          </div>
          
          {/* Mobile Close Button */}
          <button className="sidebar__close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Navigation Links with React Icons */}
        <nav className="sidebar__nav" onClick={onClose}>
          <a href="#" className="sidebar__link sidebar__link--active">
            <FiGrid size={18} />
            <span>Dashboard</span>
          </a>

          <a href="#" className="sidebar__link">
            <FiCheckSquare size={18} />
            <span>My Tasks</span>
          </a>

          <a href="#" className="sidebar__link">
            <FiColumns size={18} />
            <span>Board</span>
          </a>

          <a href="#" className="sidebar__link">
            <FiSettings size={18} />
            <span>Settings</span>
          </a>
        </nav>

      </aside>
    </>
  );
}

export default Sidebar;