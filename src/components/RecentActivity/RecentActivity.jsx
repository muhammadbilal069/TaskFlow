import React from 'react';
import { FiCheckCircle, FiPlusCircle, FiSettings } from 'react-icons/fi';
import './RecentActivity.css';

function RecentActivity() {
  return (
    <div className="activity-card">
      <div className="activity-card__header">
        <div className="activity-title-group">
          <FiCheckCircle className="activity-main-icon" />
          <h3>Recent Activity</h3>
        </div>
        <span className="view-all-link">View All →</span>
      </div>

      <div className="activity-list">
        <div className="activity-row">
          <div className="activity-icon-box green">✓</div>
          <p><span>You completed</span> Design new dashboard</p>
          <span className="activity-time">2 hours ago</span>
        </div>
        <div className="activity-row">
          <div className="activity-icon-box purple">+</div>
          <p><span>You created</span> Add login page</p>
          <span className="activity-time">4 hours ago</span>
        </div>
        <div className="activity-row">
          <div className="activity-icon-box orange">⚙</div>
          <p><span>You updated</span> Settings page</p>
          <span className="activity-time">1 day ago</span>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;