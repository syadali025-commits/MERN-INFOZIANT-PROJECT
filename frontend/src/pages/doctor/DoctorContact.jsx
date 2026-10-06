import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const DoctorContact = () => {
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

  const handleSchedule = () => {
    navigate('/doctor/schedule');
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
            <button onClick={handleSchedule} className="nav-button">📆 Schedule</button>
          </nav>
          <div className="header-right">
            <button className="header-button contact-button active">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👨‍⚕️ {userInfo?.name || 'Dr. xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="contact-container">
            <h2>Contact Hospital Administration</h2>
            <p className="contact-subtitle">Reach out to hospital administration for any queries or support.</p>

            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">🏥</div>
                <h3>Hospital Administration</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Admin Office:</span>
                    <span className="contact-value">Ground Floor, Block A</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Working Hours:</span>
                    <span className="contact-value">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Emergency Contact</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Admin Line:</span>
                    <span className="contact-value">+91 98765 43210</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">IT Support:</span>
                    <span className="contact-value">+91 98765 43215</span>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Support</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Admin:</span>
                    <span className="contact-value">admin@dochospital.com</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">IT Support:</span>
                    <span className="contact-value">it@dochospital.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorContact;
