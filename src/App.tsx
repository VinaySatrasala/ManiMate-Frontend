import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatInterface from './components/ChatInterface';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatProvider>
                  <ChatInterface />
                </ChatProvider>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;