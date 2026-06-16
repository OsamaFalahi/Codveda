import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="profile-page">
        <div className="profile-card">
          <h2>Profile</h2>
          <div className="profile-info">
            <div className="profile-avatar">
              {(user?.name || user?.email)?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-details">
              <p><span className="label">Name:</span> {user?.name || 'Not set'}</p>
              <p><span className="label">Email:</span> {user?.email}</p>
              <p><span className="label">Role:</span> {user?.role}</p>
              <p><span className="label">Member since:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;