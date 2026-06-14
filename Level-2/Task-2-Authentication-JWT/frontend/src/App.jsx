import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import { authService } from './services/authService.js';

function LoadingSpinner() {
  return <div className="container"><p>Loading...</p></div>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await authService.getProfile();
      console.log('checkAuth res.data:', res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      setCurrentPage('products');
    } catch (err) {
      console.error('checkAuth error:', err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    await checkAuth();
  };

  const handleSignupSuccess = async () => {
    await checkAuth();
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {}
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('login');
  };

  if (loading) return <LoadingSpinner />;

  let mainContent = null;
  if (currentPage === 'login' && !isAuthenticated) {
    mainContent = <LoginForm onSuccess={handleLoginSuccess} onSwitchToSignup={() => setCurrentPage('signup')} />;
  } else if (currentPage === 'signup' && !isAuthenticated) {
    mainContent = <SignupForm onSuccess={handleSignupSuccess} onSwitchToLogin={() => setCurrentPage('login')} />;
  } else if (isAuthenticated && currentPage === 'products') {
    mainContent = <ProductsPage user={user} />;
  }

  return (
    <div>
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1>Codveda Product Manager</h1>
          {isAuthenticated && (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>
                {user?.name || user?.email} ({user?.role})
              </span>
              <button className="btn btn-secondary" onClick={() => setCurrentPage('products')}>
                Products
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main>{mainContent}</main>
    </div>
  );
}

export default App;
