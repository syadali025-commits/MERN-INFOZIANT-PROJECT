import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const DoctorHome = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/doctor/login');
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

  const handleContact = () => {
    navigate('/doctor/contact');
  };

  const handleStats = () => {
    alert('Statistics feature coming soon!');
  };

  const handleMessages = () => {
    alert('Messages feature coming soon!');
  };

  const handleSettings = () => {
    alert('Settings feature coming soon!');
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
            <button className="nav-button active">🏠 Home</button>
            <button onClick={handleAppointments} className="nav-button">📅 Appointments</button>
            <button onClick={handlePatients} className="nav-button">👥 Patients</button>
            <button onClick={handleSchedule} className="nav-button">📆 Schedule</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👨‍⚕️ {userInfo?.name || 'Dr. xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="hero-section">
            <h1>Welcome, Dr. {userInfo?.name || 'Doctor'}!</h1>
            <p>Manage your appointments, patients, and schedule efficiently.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>View Appointments</h3>
              <p>See all your scheduled appointments and manage your daily schedule.</p>
              <button onClick={handleAppointments} className="feature-button">View Appointments</button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Patient Records</h3>
              <p>Access and manage patient medical records and history.</p>
              <button onClick={handlePatients} className="feature-button">View Patients</button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📆</div>
              <h3>Manage Schedule</h3>
              <p>Set your availability and manage your working hours.</p>
              <button onClick={handleSchedule} className="feature-button">Manage Schedule</button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Statistics</h3>
              <p>View your performance statistics and patient feedback.</p>
              <button onClick={handleStats} className="feature-button">View Stats</button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Messages</h3>
              <p>Communicate with patients and respond to queries.</p>
              <button onClick={handleMessages} className="feature-button">View Messages</button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Update your profile and manage account settings.</p>
              <button onClick={handleSettings} className="feature-button">Settings</button>
            </div>
          </div>

          <div className="info-section">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Check Appointments</h3>
                <p>View your daily schedule and upcoming patient appointments.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Review Patient Info</h3>
                <p>Access patient medical history before consultations.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Conduct Consultations</h3>
                <p>Provide quality healthcare to your patients.</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Update Records</h3>
                <p>Document consultation details and prescriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
