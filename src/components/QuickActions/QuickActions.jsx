import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare, FiColumns, FiSettings, FiBarChart2 } from 'react-icons/fi';
import './QuickActions.css';

function QuickActions({ onOpenModal }) {
  const navigate = useNavigate();

  return (
    <div className="quick-actions-card">
      <div className="quick-actions__header">
        <div className="quick-title-group">
          <FiPlusSquare className="quick-main-icon" />
          <h3>Quick Actions</h3>
        </div>
      </div>

      <div className="quick-actions-grid">
        <button className="quick-action-box purple" onClick={onOpenModal}>
          <span className="q-icon">📋</span>
          <span>Add Task</span>
        </button>

        <button className="quick-action-box blue" onClick={() => navigate('/board')}>
          <span className="q-icon">📊</span>
          <span>View Board</span>
        </button>

        <button className="quick-action-box green" onClick={() => navigate('/settings')}>
          <span className="q-icon">⚙️</span>
          <span>Settings</span>
        </button>

        <button className="quick-action-box orange" onClick={() => alert("Analytics coming soon!")}>
          <span className="q-icon">📈</span>
          <span>View Analytics</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;