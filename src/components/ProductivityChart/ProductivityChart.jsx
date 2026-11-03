import React, { useState } from 'react';
import { FiTrendingUp, FiChevronDown } from 'react-icons/fi';
import './ProductivityChart.css';

function ProductivityChart() {
  const [filter, setFilter] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <div className="chart-title-group">
          <FiTrendingUp className="chart-main-icon" />
          <h3>Your Productivity</h3>
        </div>
       <div className="custom-select-wrapper">
  <div 
    className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    <span>{filter}</span>
    <FiChevronDown className="arrow" />
  </div>

  {isDropdownOpen && (
    <div className="custom-options-list">
      <div className="custom-option" onClick={() => { setFilter('This Week'); setIsDropdownOpen(false); }}>This Week</div>
      <div className="custom-option" onClick={() => { setFilter('This Month'); setIsDropdownOpen(false); }}>This Month</div>
      <div className="custom-option" onClick={() => { setFilter('This Year'); setIsDropdownOpen(false); }}>This Year</div>
    </div>
  )}
</div>
      </div>

      {/* SVG Curve Productivity Chart matching reference */}
      <div className="chart-body">
        <div className="chart-y-axis">
          <span>12</span>
          <span>9</span>
          <span>6</span>
          <span>3</span>
          <span>0</span>
        </div>
        <div className="chart-visual-area">
          <div className="chart-tooltip-badge">10 Tasks</div>
          <svg className="productivity-svg" viewBox="0 0 600 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6257E8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6257E8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d="M 0,130 Q 100,80 200,110 T 400,30 T 600,100 L 600,160 L 0,160 Z" 
              fill="url(#chartGradient)" 
            />
            <path 
              d="M 0,130 Q 100,80 200,110 T 400,30 T 600,100" 
              fill="none" 
              stroke="#6257E8" 
              strokeWidth="3" 
            />
            <circle cx="400" cy="30" r="6" fill="#6257E8" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <div className="chart-x-axis">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityChart;