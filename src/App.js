import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import Manual from './pages/Manual';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';
import Workflow from './pages/Workflow';
import ScriptLoader from './components/ScriptLoader';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route index
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="workflow"
          element={
            <ProtectedRoute>
              <Workflow />
            </ProtectedRoute>
          }
        />
        <Route path="tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="manual" element={<Manual />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScriptLoader /> 
    </Router>
  );
}

export default App;
