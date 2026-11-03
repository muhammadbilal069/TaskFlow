import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiBell, 
  FiMonitor, 
  FiSliders, 
  FiAlertTriangle, 
  FiCheck, 
  FiSave, 
  FiEye, 
  FiEyeOff, 
  FiCamera, 
  FiX,
  FiGlobe,
  FiCalendar,
  FiClock
} from 'react-icons/fi';
import './Settings.css';

function Settings() {
  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // 1. Profile State (Saved in localStorage)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('taskflow_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Bilal Ahmed',
      email: 'bilal@taskflow.io',
      bio: 'Product Designer & Frontend Developer passionate about building clean SaaS user interfaces.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Avatar Image Upload & Preview simulation using FileReader
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('taskflow_profile', JSON.stringify(profile));
    triggerToast('Profile updated successfully!');
  };

  // 2. Account & Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      triggerToast('Please fill in all password fields.');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      triggerToast('New passwords do not match!');
      return;
    }
    if (security.newPassword.length < 6) {
      triggerToast('Password must be at least 6 characters long.');
      return;
    }

    triggerToast('Password changed successfully!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // 3. Notification Settings State (Saved in localStorage)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('taskflow_notifications');
    return saved ? JSON.parse(saved) : {
      taskCompletion: true,
      upcomingReminders: true,
      overdueAlerts: true,
      newTask: false,
      emailNotifs: true
    };
  });

  useEffect(() => {
    localStorage.setItem('taskflow_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      triggerToast('Notification preferences updated.');
      return updated;
    });
  };

  // 4. Appearance State (Saved in localStorage)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('taskflow_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    triggerToast(`Theme changed to ${selectedTheme} mode successfully!`);
  };

  // 5. General Preferences State (Saved in localStorage)
  const [general, setGeneral] = useState(() => {
    const saved = localStorage.getItem('taskflow_general');
    return saved ? JSON.parse(saved) : {
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    };
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneral(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    localStorage.setItem('taskflow_general', JSON.stringify(general));
    triggerToast('Preferences saved successfully!');
  };

  // 6. Danger Zone Modals State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleDeleteAccountConfirm = () => {
    setShowDeleteModal(false);
    triggerToast('Account deletion requested (Frontend simulation).');
  };

  const handleClearPreferencesConfirm = () => {
    localStorage.clear();
    setShowClearModal(false);
    triggerToast('All application preferences cleared.');
    window.location.reload();
  };

  return (
    <div className="settings-page">
      {/* Top-Right Toast Notification */}
      {toast.show && (
        <div className="toast-notification">
          <FiCheck className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and application preferences.</p>
      </div>

      <div className="settings-container">
        {/* 1. Profile Settings */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiUser className="settings-icon" />
            <div>
              <h2>Profile Information</h2>
              <p>Update your photo and personal details.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="profile-avatar-group">
              <img src={profile.avatar} alt="Profile Avatar" className="profile-avatar-img" />
              <div className="avatar-upload-action">
                <label htmlFor="avatar-input" className="btn-secondary upload-label">
                  <FiCamera /> Change Avatar
                </label>
                <input 
                  id="avatar-input" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  style={{ display: 'none' }} 
                />
                <span className="avatar-hint">JPG, GIF or PNG. Max size 2MB</span>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleProfileChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleProfileChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea 
                name="bio" 
                rows="3" 
                value={profile.bio} 
                onChange={handleProfileChange}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FiSave /> Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* 2. Account & Security */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiLock className="settings-icon" />
            <div>
              <h2>Account & Security</h2>
              <p>Update your password and secure your account.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPasswords.current ? 'text' : 'password'} 
                  name="currentPassword" 
                  placeholder="Enter current password"
                  value={security.currentPassword} 
                  onChange={handleSecurityChange} 
                />
                <button 
                  type="button" 
                  className="eye-btn" 
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPasswords.new ? 'text' : 'password'} 
                    name="newPassword" 
                    placeholder="Enter new password"
                    value={security.newPassword} 
                    onChange={handleSecurityChange} 
                  />
                  <button 
                    type="button" 
                    className="eye-btn" 
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPasswords.confirm ? 'text' : 'password'} 
                    name="confirmPassword" 
                    placeholder="Confirm new password"
                    value={security.confirmPassword} 
                    onChange={handleSecurityChange} 
                  />
                  <button 
                    type="button" 
                    className="eye-btn" 
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </section>

        {/* 3. Notification Settings */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiBell className="settings-icon" />
            <div>
              <h2>Notifications</h2>
              <p>Choose what notifications you want to receive.</p>
            </div>
          </div>

          <div className="toggles-list">
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Task Completion</h4>
                <p>Receive notifications when tasks are marked as completed.</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.taskCompletion} 
                  onChange={() => handleNotificationToggle('taskCompletion')} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Upcoming Deadline Reminders</h4>
                <p>Get alerted before your task due dates arrive.</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.upcomingReminders} 
                  onChange={() => handleNotificationToggle('upcomingReminders')} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Overdue Task Alerts</h4>
                <p>Receive alerts for tasks past their due date.</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.overdueAlerts} 
                  onChange={() => handleNotificationToggle('overdueAlerts')} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>New Task Creation</h4>
                <p>Get notified when a new task is added to your board.</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.newTask} 
                  onChange={() => handleNotificationToggle('newTask')} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Email Notifications</h4>
                <p>Receive weekly digests and important updates via email.</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.emailNotifs} 
                  onChange={() => handleNotificationToggle('emailNotifs')} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        {/* 4. Appearance Settings */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiMonitor className="settings-icon" />
            <div>
              <h2>Appearance</h2>
              <p>Customize the look and feel of your application.</p>
            </div>
          </div>

          <div className="theme-options-grid">
            <div 
              className={`theme-card ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('light')}
            >
              <div className="theme-preview light-preview"></div>
              <span>Light Mode</span>
            </div>

            <div 
              className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('dark')}
            >
              <div className="theme-preview dark-preview"></div>
              <span>Dark Mode</span>
            </div>

            <div 
              className={`theme-card ${theme === 'system' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('system')}
            >
              <div className="theme-preview system-preview"></div>
              <span>System Default</span>
            </div>
          </div>
        </section>

        {/* 5. General Preferences */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiSliders className="settings-icon" />
            <div>
              <h2>General Preferences</h2>
              <p>Set your language, date format, and time settings.</p>
            </div>
          </div>

          <form onSubmit={handleSaveGeneral} className="settings-form">
            <div className="form-grid">
              <div className="form-group">
                <label><FiGlobe /> Language</label>
                <select name="language" value={general.language} onChange={handleGeneralChange}>
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="form-group">
                <label><FiCalendar /> Date Format</label>
                <select name="dateFormat" value={general.dateFormat} onChange={handleGeneralChange}>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="form-group">
                <label><FiClock /> Time Format</label>
                <select name="timeFormat" value={general.timeFormat} onChange={handleGeneralChange}>
                  <option value="12h">12-hour (11:40 PM)</option>
                  <option value="24h">24-hour (23:40)</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FiSave /> Save Preferences
              </button>
            </div>
          </form>
        </section>

        {/* 6. Danger Zone */}
        <section className="settings-card danger-card">
          <div className="settings-card__header">
            <FiAlertTriangle className="settings-icon danger-icon" />
            <div>
              <h2>Danger Zone</h2>
              <p>Irreversible and destructive actions.</p>
            </div>
          </div>

          <div className="danger-actions">
            <div className="danger-action-item">
              <div>
                <h4>Clear Application Data</h4>
                <p>Reset all tasks, preferences, and local storage data to default.</p>
              </div>
              <button className="btn-danger-outline" onClick={() => setShowClearModal(true)}>
                Clear Data
              </button>
            </div>

            <div className="danger-action-item">
              <div>
                <h4>Delete Account</h4>
                <p>Permanently remove your account and all associated data.</p>
              </div>
              <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Clear Data Confirmation Modal */}
      {showClearModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Clear All Application Data?</h2>
              <button className="modal-close-btn" onClick={() => setShowClearModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p>This action will reset your tasks, profile, and preferences back to default. This cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowClearModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleClearPreferencesConfirm}>Yes, Clear Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Delete Account?</h2>
              <button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete your TaskFlow account? All your personal data and projects will be removed.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleDeleteAccountConfirm}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;