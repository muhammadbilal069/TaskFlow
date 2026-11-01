import React, { useState } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiCheckCircle, 
  FiClock, 
  FiAlertCircle, 
  FiList, 
  FiTrash2, 
  FiCalendar, 
  FiX, 
  FiInbox 
} from 'react-icons/fi';
import tasksData from '../../Data/tasks.js';
import './MyTasks.css';

function MyTasks() {
  // State Management
  const [tasks, setTasks] = useState(tasksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Task Form State
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  // Dynamic Task Counters matching your data statuses
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  // Toggle Task Completion Status
  const handleToggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Add New Task Handler
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const createdTask = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setTasks([createdTask, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsModalOpen(false);
  };

  // Filter & Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && task.status === activeFilter;
  });

  return (
    <div className="my-tasks-page">
      {/* 1. Page Header */}
      <div className="tasks-header">
        <div className="tasks-header__info">
          <h1>My Tasks</h1>
          <p>Manage your tasks, track progress, and stay productive.</p>
        </div>
        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus className="btn-icon" /> Add New Task
        </button>
      </div>

      {/* 2. Summary Cards */}
      <div className="task-stats-grid">
        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--total">
            <FiList />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--completed">
            <FiCheckCircle />
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--progress">
            <FiClock />
          </div>
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{inProgressCount}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--pending">
            <FiAlertCircle />
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* 3. Search Bar and Filter Tabs */}
      <div className="tasks-toolbar">
        <div className="tasks-search">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tasks by title or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tasks-filters">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Tasks
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* 4. Task List Area */}
      <div className="tasks-list-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.status === 'completed' ? 'task-card--completed' : ''}`}
            >
              <div className="task-card__left">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={task.status === 'completed'}
                    onChange={() => handleToggleComplete(task.id)}
                  />
                  <span className="custom-checkmark"></span>
                </label>

                <div className="task-details">
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  
                  <div className="task-meta">
                    <span className={`priority-badge priority--${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className="due-date">
                      <FiCalendar /> {task.dueDate}
                    </span>
                    <span className={`status-badge status--${task.status.replace('-', '_')}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="task-card__right">
                <button 
                  className="delete-task-btn" 
                  title="Delete Task" 
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          /* 5. Empty State */
          <div className="tasks-empty-state">
            <div className="empty-icon-circle">
              <FiInbox />
            </div>
            <h3>No tasks found</h3>
            <p>Try adjusting your search query or switching filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* 6. Add Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="modal-form">
              <div className="form-group">
                <label>Task Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Redesign Settings UI"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Add brief details about this task..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTasks;