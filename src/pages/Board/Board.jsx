import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, useDroppable, useDraggable } from '@dnd-kit/core';
import { 
  FiPlus, 
  FiSearch, 
  FiTrash2, 
  FiCalendar, 
  FiX, 
  FiInbox,
  FiEdit2,
  FiCheck,
  FiMoreVertical,
  FiAlertCircle,
  FiChevronDown  
} from 'react-icons/fi';
import tasksData from '../../Data/tasks.js';
import './Board.css';

// --- Draggable Task Card Component ---
function KanbanCard({ task, onEdit, onDelete, onView }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(task.id),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.6 : 1,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={`kanban-card priority--${task.priority?.toLowerCase()}`}
      onClick={() => onView(task)}
    >
      <div className="kanban-card__header">
        <span className={`priority-badge priority--${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="card-action-btn" title="Edit Task" onClick={(e) => onEdit(task, e)}>
            <FiEdit2 />
          </button>
          <button className="card-action-btn delete-btn" title="Delete Task" onClick={() => onDelete(task.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>

      <h4 className="kanban-card__title">{task.title}</h4>
      {task.description && <p className="kanban-card__desc">{task.description}</p>}

      <div className="kanban-card__footer">
        <span className="due-date">
          <FiCalendar /> {task.dueDate}
        </span>
      </div>
    </div>
  );
}

// --- Droppable Kanban Column Component ---
function KanbanColumn({ id, title, count, statusClass, children, onQuickAdd }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`kanban-column ${statusClass} ${isOver ? 'kanban-column--over' : ''}`}>
      <div className="column-header">
        <div className="column-title-group">
          <span className="column-dot"></span>
          <h3>{title}</h3>
        </div>
        <span className="column-count">{count}</span>
      </div>

      <div className="column-cards-list">
        {children.length > 0 ? (
          children
        ) : (
          <div className="column-empty-state">
            <p>No tasks here</p>
          </div>
        )}
      </div>

      <button className="column-add-btn" onClick={() => onQuickAdd(id)}>
        <FiPlus /> Add task
      </button>
    </div>
  );
}

// --- Main Board Component ---
function Board() {
  // Load tasks from localStorage or fallback to tasksData
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : tasksData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // DnD Sensors setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Prevent accidental drags on click
      },
    })
  );

  // Handle Drag End (Moving tasks between columns)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // 'pending', 'in-progress', or 'completed'

    setTasks(prev =>
      prev.map(task => {
        if (String(task.id) === String(taskId)) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
    triggerToast(`Task moved successfully!`);
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    triggerToast('Task deleted successfully!');
  };

  // Open Modal for Create (with optional default status)
  const handleOpenCreateModal = (defaultStatus = 'pending') => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      status: defaultStatus
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (task, e) => {
    e.stopPropagation();
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || '',
      status: task.status || 'pending'
    });
    setIsModalOpen(true);
  };

  // View Details
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  // Submit Form (Create or Update)
  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      setTasks(prev =>
        prev.map(task => task.id === editingId ? { ...task, ...formData } : task)
      );
      triggerToast('Task updated successfully!');
    } else {
      const newTask = {
        id: Date.now(),
        ...formData
      };
      setTasks([newTask, ...prev]);
      triggerToast('New task created successfully!');
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  // Filter & Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPriority = priorityFilter === 'all' || task.priority?.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesPriority;
  });

  // Column specific filtered lists
  const todoTasks = filteredTasks.filter(t => t.status === 'pending');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  return (
    <div className="board-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-notification">
          <FiCheck className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Board Header */}
      <div className="board-header">
        <div className="board-header__info">
          <h1>Task Board</h1>
          <p>Organize your work, track progress, and manage workflows visually.</p>
        </div>
        <button className="add-task-btn" onClick={() => handleOpenCreateModal('pending')}>
          <FiPlus className="btn-icon" /> Add New Task
        </button>
      </div>

      {/* 2. Toolbar (Search & Custom Priority Dropdown Filter) */}
      <div className="board-toolbar">
        <div className="board-search">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search board tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="board-filters">
          <span className="filter-label">Priority:</span>
          <div className="custom-select-wrapper">
            <div 
              className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {priorityFilter === 'all' && 'All Priorities'}
                {priorityFilter === 'high' && 'High'}
                {priorityFilter === 'medium' && 'Medium'}
                {priorityFilter === 'low' && 'Low'}
              </span>
                <FiChevronDown className="arrow" />
            </div>

            {isDropdownOpen && (
              <div className="custom-options-list">
                <div 
                  className={`custom-option ${priorityFilter === 'all' ? 'selected' : ''}`} 
                  onClick={() => { setPriorityFilter('all'); setIsDropdownOpen(false); }}
                >
                  All Priorities
                </div>
                <div 
                  className={`custom-option ${priorityFilter === 'high' ? 'selected' : ''}`} 
                  onClick={() => { setPriorityFilter('high'); setIsDropdownOpen(false); }}
                >
                  High
                </div>
                <div 
                  className={`custom-option ${priorityFilter === 'medium' ? 'selected' : ''}`} 
                  onClick={() => { setPriorityFilter('medium'); setIsDropdownOpen(false); }}
                >
                  Medium
                </div>
                <div 
                  className={`custom-option ${priorityFilter === 'low' ? 'selected' : ''}`} 
                  onClick={() => { setPriorityFilter('low'); setIsDropdownOpen(false); }}
                >
                  Low
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Kanban Columns Container with DnD Context */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="kanban-board-grid">
          {/* Column 1: To Do */}
          <KanbanColumn 
            id="pending" 
            title="To Do" 
            count={todoTasks.length} 
            statusClass="column--todo"
            onQuickAdd={handleOpenCreateModal}
          >
            {todoTasks.map(task => (
              <KanbanCard 
                key={task.id} 
                task={task} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteTask} 
                onView={handleViewDetails} 
              />
            ))}
          </KanbanColumn>

          {/* Column 2: In Progress */}
          <KanbanColumn 
            id="in-progress" 
            title="In Progress" 
            count={inProgressTasks.length} 
            statusClass="column--progress"
            onQuickAdd={handleOpenCreateModal}
          >
            {inProgressTasks.map(task => (
              <KanbanCard 
                key={task.id} 
                task={task} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteTask} 
                onView={handleViewDetails} 
              />
            ))}
          </KanbanColumn>

          {/* Column 3: Completed */}
          <KanbanColumn 
            id="completed" 
            title="Completed" 
            count={completedTasks.length} 
            statusClass="column--completed"
            onQuickAdd={handleOpenCreateModal}
          >
            {completedTasks.map(task => (
              <KanbanCard 
                key={task.id} 
                task={task} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteTask} 
                onView={handleViewDetails} 
              />
            ))}
          </KanbanColumn>
        </div>
      </DndContext>

      {/* 4. Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Task' : 'Create New Task'}</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmitTask} className="modal-form">
              <div className="form-group">
                <label>Task Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Update Landing Page"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Add brief details about this task..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="pending">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input 
                  type="date" 
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Task Details Modal */}
      {isDetailsOpen && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Task Details</h2>
              <button className="modal-close-btn" onClick={() => setIsDetailsOpen(false)}>
                <FiX />
              </button>
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
                <button type="button" className="btn-primary" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;