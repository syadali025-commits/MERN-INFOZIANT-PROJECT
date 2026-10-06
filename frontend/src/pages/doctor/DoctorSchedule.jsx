import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const DoctorSchedule = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/doctor/login');
  };

  const handleHome = () => {
    navigate('/doctor/home');
  };

  const handleAppointments = () => {
    navigate('/doctor/appointments');
  };

  const handlePatients = () => {
    navigate('/doctor/patients');
  };

  const handleContact = () => {
    navigate('/doctor/contact');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-left">
            <div className="header-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="header-title">DocConnect - Doctor Portal</span>
          </div>
          <nav className="header-nav">
            <button onClick={handleHome} className="nav-button">🏠 Home</button>
            <button onClick={handleAppointments} className="nav-button">📅 Appointments</button>
            <button onClick={handlePatients} className="nav-button">👥 Patients</button>
            <button className="nav-button active">📆 Schedule</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👨‍⚕️ {userInfo?.name || 'Dr. xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="status-container">
            <h2>Manage Schedule</h2>
            <div className="no-booking">
              <div className="no-booking-icon">📆</div>
              <h3>Schedule Management</h3>
              <p>Set your availability and manage your working hours.</p>
              <p className="booking-reference">Feature coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
