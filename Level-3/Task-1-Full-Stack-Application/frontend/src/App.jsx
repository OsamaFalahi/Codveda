import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function App() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">Codveda App</Link>
          <div className="nav-links">
            {user ? (
              <>
                <span className="user-info">Hi, {user.name || user.email}</span>
                <Link to="/profile" className="btn btn-secondary">Profile</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin-dashboard" className="btn btn-secondary">Admin Dashboard</Link>
                )}
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;