import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/patient/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleBookToken = () => {
    alert('Book Token feature coming soon!');
  };

  const handlePayment = () => {
    alert('Payment feature coming soon!');
  };

  const handleContact = () => {
    alert('Contact feature coming soon!');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-left">
            <div className="header-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="header-title">Doc Token System</span>
          </div>
          <nav className="header-nav">
            <button onClick={handleHome} className="nav-button">🏠 Home</button>
            <button className="nav-button">📅 Bookings</button>
            <button className="nav-button">💳 Payment</button>
            <button className="nav-button">📈 Status</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👤 {userInfo?.name || 'xyz'}</button>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="welcome-card">
            <h2>Welcome, {userInfo?.name || 'Patient'}!</h2>
            <p>You are now logged in to the DocConnect patient portal.</p>
          </div>

          <div className="action-cards">
            <div className="action-card" onClick={handleBookToken}>
              <div className="card-icon">🎫</div>
              <h3>Book Token</h3>
              <p>Book an appointment with a doctor</p>
            </div>

            <div className="action-card" onClick={handlePayment}>
              <div className="card-icon">💳</div>
              <h3>Payment</h3>
              <p>View and manage your payments</p>
            </div>

            <div className="action-card" onClick={handleContact}>
              <div className="card-icon">📞</div>
              <h3>Contact</h3>
              <p>Get in touch with support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
