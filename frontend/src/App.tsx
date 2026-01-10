import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import type { ReactNode } from 'react';

// A generic Dashboard placeholder (We will build the real one next)
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-archival-paper p-8">
      <h1 className="text-2xl font-mono">Welcome, {user?.name}</h1>
      <button onClick={logout} className="mt-4 text-archival-red underline cursor-pointer">
        Logout
      </button>
    </div>
  );
};


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-archival-paper flex items-center justify-center font-mono">LOADING SYSTEM...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;