import React from 'react';
import './StatCard.css';

function StatCard({ title, count, icon, color, comparison }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <p className="stat-card__title">{title}</p>
        <div
          className="stat-card__icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      <div className="stat-card__bottom">
        <h2>{count}</h2>
        {comparison && <span className="stat-card__trend">{comparison}</span>}
      </div>
    </div>
  );
}

export default StatCard;