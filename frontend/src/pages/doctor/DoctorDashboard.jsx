import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/doctor/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, Dr. {userInfo?.name || 'Doctor'}!</h2>
          <p>You are now logged in to the DocConnect doctor portal.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
