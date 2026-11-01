import React from 'react';
import './UpcomingTasks.css';

function UpcomingTasks({ tasks, onToggleTask }) {
  // Sirf woh tasks jo complete nahi hue hain unhein dikhane ke liye
  const pendingTasks = tasks.filter(task => task.status !== 'completed');

  return (
    <div className="upcoming-card">
      <div className="upcoming-card__header">
        <div>
          <h3 className="upcoming-card__title">Upcoming Tasks</h3>
          <p className="upcoming-card__subtitle">Tasks that need your attention</p>
        </div>
        <span className="view-all-link">View All →</span>
      </div>

      <div className="upcoming-tasks-list">
        {pendingTasks.length === 0 ? (
          <p className="no-tasks-text">No pending tasks! Great job 🎉</p>
        ) : (
          pendingTasks.map(task => (
            <div className="task-item" key={task.id}>
              <div className="task-item__left">
                <input 
                  type="checkbox" 
                  checked={task.status === 'completed'}
                  onChange={() => onToggleTask(task.id, 'completed')}
                  className="task-checkbox"
                />
                <div className="task-info">
                  <h4 className="task-title">{task.title}</h4>
                </div>
              </div>

              <div className="task-item__right">
                <span className={`task-priority priority-${task.priority}`}>
                  {task.priority}
                </span>
                <span className="task-date">📅 {task.dueDate}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UpcomingTasks;