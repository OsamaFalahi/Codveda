import React, { useState } from 'react';
import { authService } from '../services/authService.js';

const LoginForm = ({ onSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login({ email, password });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      await authService.login({
        email: role === 'ADMIN' ? 'admin@codveda.com' : 'user@codveda.com',
        password: 'password123'
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || `Demo ${role} login failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="demo-section">
          <p>Quick demo login:</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleDemoLogin('ADMIN')}
              disabled={loading}
            >
              Demo Admin
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleDemoLogin('USER')}
              disabled={loading}
            >
              Demo User
            </button>
          </div>
        </div>
        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={onSwitchToSignup} className="link">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;