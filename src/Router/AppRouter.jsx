
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import MyTasks from '../pages/MyTasks/MyTasks';
import Board from '../pages/Board/Board';
import Settings from '../pages/Settings/Settings';
import NotFound from '../pages/NotFound/NotFound';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/board" element={<Board />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
