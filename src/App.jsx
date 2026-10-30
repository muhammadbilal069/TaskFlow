import React, { useState } from 'react';
import './App.css';
import Navbar from './components/ Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  // 1. Sidebar ka open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

     <div className="app-main">
        {/* 3. Navbar ko toggle function pass kiya */}
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

    <div className="app-layout">
      {/* 2. Sidebar ko state aur close function pass kiya */}
      <Sidebar
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      </div>
    </div>
    
  );
}

export default App;