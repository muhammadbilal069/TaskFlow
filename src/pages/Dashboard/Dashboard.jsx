import React, { useState, useEffect} from 'react';
import tasksData from '../../Data/tasks.js';
import StatCard from '../../components/StatCard/StatCard';
import ProductivityChart from '../../components/ProductivityChart/ProductivityChart.jsx';
import UpcomingTasks from '../../components/UpcomingTasks/UpcomingTasks.jsx';
import RecentActivity from '../../components/RecentActivity/RecentActivity.jsx';
import QuickActions from '../../components/QuickActions/QuickActions.jsx';
import './Dashboard.css';


function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : tasksData;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('taskflow_tasks');
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;

 const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      localStorage.setItem('taskflow_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="dashboard__welcome">
        <div>
          <h1 style={{fontFamily:"Times New Roman"}}>Welcome Back, John! 👋</h1>
          <p>Here's what's happening with your tasks today.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard__stats">
        <StatCard title="Total Tasks" count={totalTasks} icon="📋" color="#eee5ff" comparison="↑ +2 this week" />
        <StatCard title="Completed" count={completedTasks} icon="✓" color="#dcfce7" comparison="↑ +1 this week" />
        <StatCard title="Pending" count={pendingTasks} icon="◷" color="#ffedd5" comparison="↓ -1 this week" />
        <StatCard title="In Progress" count={inProgressTasks} icon="↗" color="#dbeafe" comparison="↑ +1 this week" />
      </div>

      {/* Middle Grid: Productivity Chart & Upcoming Tasks */}
      <div className="dashboard__grid-2">
        <ProductivityChart />
        <UpcomingTasks tasks={tasks} onToggleTask={updateTaskStatus} />
      </div>

      {/* Bottom Grid: Recent Activity & Quick Actions */}
      <div className="dashboard__grid-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;