import React from 'react';
import { FiGrid, FiCheckSquare, FiColumns, FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
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
            <nav className="sidebar__nav">

          {/* Dashboard */}
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <FiGrid size={18} />
            <span>Dashboard</span>
          </NavLink>

          {/* My Tasks */}
          <NavLink
            to="/my-tasks"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <FiCheckSquare size={18} />
            <span>My Tasks</span>
          </NavLink>

          {/* Board */}
          <NavLink
            to="/board"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <FiColumns size={18} />
            <span>Board</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <FiSettings size={18} />
            <span>Settings</span>
          </NavLink>

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;