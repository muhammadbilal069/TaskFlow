import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiBell, 
  FiSliders, 
  FiCheck, 
  FiSave, 
  FiCamera, 
  FiGlobe,
  FiCalendar,
  FiTrash2,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import './Settings.css';

function Settings() {
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // 1. Profile State (Using 'taskflow_profile_v2' to bypass old browser cache)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('taskflow_profile_v2');
    return saved ? JSON.parse(saved) : {
      name: 'John Doe',
      email: 'john.doe@taskflow.io',
      bio: 'Product Manager & UX Designer managing SaaS workflows.',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=JohnDoe'
    };
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

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
    localStorage.setItem('taskflow_profile_v2', JSON.stringify(profile));
    triggerToast('Profile updated successfully!');
  };

  // 2. Notification Preferences State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('taskflow_notifications');
    return saved ? JSON.parse(saved) : {
      taskCompletion: true,
      upcomingReminders: true,
      overdueAlerts: true
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

  // 3. General Preferences State & Custom Dropdowns
  const [general, setGeneral] = useState(() => {
    const saved = localStorage.getItem('taskflow_general');
    return saved ? JSON.parse(saved) : {
      language: 'en',
      dateFormat: 'MM/DD/YYYY'
    };
  });

  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English (US)' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    localStorage.setItem('taskflow_general', JSON.stringify(general));
    triggerToast('General preferences saved successfully!');
  };

  // 4. Reset Data Modal State
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetDataConfirm = () => {
    localStorage.removeItem('taskflow_tasks');
    localStorage.removeItem('taskflow_profile_v2');
    localStorage.removeItem('taskflow_notifications');
    localStorage.removeItem('taskflow_general');
    setShowResetModal(false);
    triggerToast('All TaskFlow data reset to default.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="settings-page">
      {toast.show && (
        <div className="toast-notification">
          <FiCheck className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account profile and application preferences.</p>
      </div>

      <div className="settings-container">
        {/* 1. Profile Settings */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiUser className="settings-icon" />
            <div>
              <h2>Profile Information</h2>
              <p>Update your profile picture and personal details.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="profile-avatar-group">
              <img src={profile.avatar} alt="Profile Avatar" className="profile-avatar-img" />
              <div className="avatar-upload-action">
                <label htmlFor="avatar-input" className="upload-label">
                  <FiCamera /> Change Avatar
                </label>
                <input 
                  id="avatar-input" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  style={{ display: 'none' }} 
                />
                <span className="avatar-hint">JPG, PNG or GIF. Max size 2MB</span>
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

        {/* 2. Notification Preferences */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiBell className="settings-icon" />
            <div>
              <h2>Notification Preferences</h2>
              <p>Choose what task alerts you want to receive.</p>
            </div>
          </div>

          <div className="toggles-list">
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Task Completion Alerts</h4>
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
          </div>
        </section>

        {/* 3. General Preferences */}
        <section className="settings-card">
          <div className="settings-card__header">
            <FiSliders className="settings-icon" />
            <div>
              <h2>General Preferences</h2>
              <p>Configure language and date display formats.</p>
            </div>
          </div>

          <form onSubmit={handleSaveGeneral} className="settings-form">
            <div className="form-grid">
              
              {/* Custom Language Dropdown */}
              <div className="form-group">
                <label><FiGlobe /> Language</label>
                <div className="custom-select-wrapper">
                  <div 
                    className={`custom-select-trigger ${openLangDropdown ? 'open' : ''}`}
                    onClick={() => {
                      setOpenLangDropdown(!openLangDropdown);
                      setOpenDateDropdown(false);
                    }}
                  >
                    <span>
                      {languageOptions.find(opt => opt.value === general.language)?.label || 'English (US)'}
                    </span>
                    <FiChevronDown className="arrow" />
                  </div>

                  {openLangDropdown && (
                    <div className="custom-options-list">
                      {languageOptions.map((opt) => (
                        <div 
                          key={opt.value}
                          className={`custom-option ${general.language === opt.value ? 'selected' : ''}`}
                          onClick={() => {
                            setGeneral(prev => ({ ...prev, language: opt.value }));
                            setOpenLangDropdown(false);
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Date Format Dropdown */}
              <div className="form-group">
                <label><FiCalendar /> Date Format</label>
                <div className="custom-select-wrapper">
                  <div 
                    className={`custom-select-trigger ${openDateDropdown ? 'open' : ''}`}
                    onClick={() => {
                      setOpenDateDropdown(!openDateDropdown);
                      setOpenLangDropdown(false);
                    }}
                  >
                    <span>{general.dateFormat}</span>
                    <FiChevronDown className="arrow" />
                  </div>

                  {openDateDropdown && (
                    <div className="custom-options-list">
                      {dateFormatOptions.map((opt) => (
                        <div 
                          key={opt.value}
                          className={`custom-option ${general.dateFormat === opt.value ? 'selected' : ''}`}
                          onClick={() => {
                            setGeneral(prev => ({ ...prev, dateFormat: opt.value }));
                            setOpenDateDropdown(false);
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FiSave /> Save Preferences
              </button>
            </div>
          </form>
        </section>

        {/* 4. Data Management / Reset Zone */}
        <section className="settings-card danger-card">
          <div className="settings-card__header">
            <FiTrash2 className="settings-icon danger-icon" />
            <div>
              <h2>Data Management</h2>
              <p>Reset local application data and tasks.</p>
            </div>
          </div>

          <div className="danger-action-item">
            <div>
              <h4>Reset TaskFlow Data</h4>
              <p>Clear all tasks and preferences stored in localStorage and reload defaults.</p>
            </div>
            <button className="btn-danger-outline" onClick={() => setShowResetModal(true)}>
              Reset Data
            </button>
          </div>
        </section>
      </div>

      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Reset TaskFlow Data?</h2>
              <button className="modal-close-btn" onClick={() => setShowResetModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p>This will clear all your tasks, profile details, and custom preferences from localStorage. Are you sure?</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowResetModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleResetDataConfirm}>Yes, Reset Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;