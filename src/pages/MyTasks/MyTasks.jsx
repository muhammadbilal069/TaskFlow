import React, { useState, useEffect } from 'react';
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
  FiInbox,
  FiEdit2,
  FiEye,
  FiCheck
} from 'react-icons/fi';
import tasksData from '../../Data/tasks.js';
import './MyTasks.css';

function MyTasks() {
  // Load tasks from localStorage or fallback to tasksData
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : tasksData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  // New / Edit Task Form State
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Helper to trigger Toast Alert
  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000); // 3 seconds baad toast khud gayab ho jayega
  };

  // Dynamic Task Counters
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
          triggerToast(nextStatus === 'completed' ? 'Task marked as completed!' : 'Task marked as pending!');
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    triggerToast('Task deleted successfully!');
  };

  // Open Modal for Creating
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (task, e) => {
    e.stopPropagation();
    setEditingId(task.id);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || ''
    });
    setIsModalOpen(true);
  };

  // View Task Details
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  // Add or Update Task Handler
  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    if (editingId) {
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === editingId ? { ...task, ...newTask } : task)
      );
      triggerToast('Task updated successfully!');
    } else {
      const createdTask = {
        id: Date.now(),
        ...newTask,
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setTasks([createdTask, ...tasks]);
      triggerToast('New task created successfully!');
    }

    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Filter & Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && task.status === activeFilter;
  });

  return (
    <div className="my-tasks-page">
      {/* Toast Notification Popup */}
      {toast.show && (
        <div className="toast-notification">
          <FiCheck className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="tasks-header">
        <div className="tasks-header__info">
          <h1>My Tasks</h1>
          <p>Manage your tasks, track progress, and stay productive.</p>
        </div>
        <button className="add-task-btn" onClick={handleOpenCreateModal}>
          <FiPlus className="btn-icon" /> Add New Task
        </button>
      </div>

      {/* 2. Summary Cards */}
      <div className="task-stats-grid">
        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--total"><FiList /></div>
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--completed"><FiCheckCircle /></div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--progress"><FiClock /></div>
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{inProgressCount}</span>
          </div>
        </div>

        <div className="task-stat-card">
          <div className="stat-icon-wrapper stat-icon--pending"><FiAlertCircle /></div>
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
          <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Tasks</button>
          <button className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`} onClick={() => setActiveFilter('pending')}>Pending</button>
          <button className={`filter-tab ${activeFilter === 'in-progress' ? 'active' : ''}`} onClick={() => setActiveFilter('in-progress')}>In Progress</button>
          <button className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`} onClick={() => setActiveFilter('completed')}>Completed</button>
        </div>
      </div>

      {/* 4. Task List Area */}
      <div className="tasks-list-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.status === 'completed' ? 'task-card--completed' : ''}`}
              onClick={() => handleViewDetails(task)}
            >
              <div className="task-card__left" onClick={(e) => e.stopPropagation()}>
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
                    <span className={`priority-badge priority--${task.priority?.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className="due-date">
                      <FiCalendar /> {task.dueDate}
                    </span>
                    <span className={`status-badge status--${task.status?.replace('-', '_')}`}>
                      {task.status?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="task-card__right" onClick={(e) => e.stopPropagation()}>
                <button className="action-icon-btn" title="View Details" onClick={() => handleViewDetails(task)}>
                  <FiEye />
                </button>
                <button className="action-icon-btn" title="Edit Task" onClick={(e) => handleOpenEditModal(task, e)}>
                  <FiEdit2 />
                </button>
                <button className="delete-task-btn" title="Delete Task" onClick={() => handleDeleteTask(task.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          /* 5. Better Empty State */
          <div className="tasks-empty-state">
            <div className="empty-icon-circle"><FiInbox /></div>
            <h3>No tasks found</h3>
            <p>No tasks match your current filter or search query. Try creating a new task or clearing filters.</p>
            <button className="empty-action-btn" onClick={handleOpenCreateModal}>
              <FiPlus /> Create New Task
            </button>
          </div>
        )}
      </div>

      {/* 6. Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Task' : 'Create New Task'}</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>

            <form onSubmit={handleSubmitTask} className="modal-form">
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
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update Task' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Task Details Modal */}
      {isDetailsOpen && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Task Details</h2>
              <button className="modal-close-btn" onClick={() => setIsDetailsOpen(false)}><FiX /></button>
            </div>
            <div className="modal-form details-body">
              <div className="detail-item">
                <span className="detail-label">Title</span>
                <h3 className="detail-value">{selectedTask.title}</h3>
              </div>
              <div className="detail-item">
                <span className="detail-label">Description</span>
                <p className="detail-value">{selectedTask.description || 'No description provided.'}</p>
              </div>
              <div className="form-row">
                <div className="detail-item">
                  <span className="detail-label">Priority</span>
                  <span className={`priority-badge priority--${selectedTask.priority?.toLowerCase()}`}>
                    {selectedTask.priority}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge status--${selectedTask.status?.replace('-', '_')}`}>
                    {selectedTask.status?.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Due Date</span>
                <span className="detail-value due-date-val"><FiCalendar /> {selectedTask.dueDate}</span>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-primary" onClick={() => setIsDetailsOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTasks;