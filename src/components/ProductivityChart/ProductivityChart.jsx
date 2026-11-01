import React, { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import './ProductivityChart.css';

function ProductivityChart() {
  const [filter, setFilter] = useState('This Week');

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <div className="chart-title-group">
          <FiTrendingUp className="chart-main-icon" />
          <h3>Your Productivity</h3>
        </div>
        <select 
          className="chart-filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
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