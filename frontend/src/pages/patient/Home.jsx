import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Home = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/patient/login');
  };

  const handleContact = () => {
    navigate('/patient/contact');
  };

  const handleBookings = () => {
    navigate('/patient/bookings');
  };

  const handlePayment = () => {
    navigate('/patient/bookings');
  };

  const handleStatus = () => {
    navigate('/patient/status');
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
            <button className="nav-button active">🏠 Home</button>
            <button onClick={handleBookings} className="nav-button">📅 Bookings</button>
            <button onClick={handlePayment} className="nav-button">💳 Payment</button>
            <button onClick={handleStatus} className="nav-button">📈 Status</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👤 {userInfo?.name || 'xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="hero-section">
            <h1>Welcome to Doc Token System</h1>
            <p>Your one-stop solution for hassle-free doctor appointments and healthcare management</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3>Easy Token Booking</h3>
              <p>Book your appointment tokens online without waiting in long queues</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications about your token status and appointment time</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Make secure online payments for consultations and treatments</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Access to qualified and experienced healthcare professionals</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access our services from anywhere using any device</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your medical data is protected with advanced security measures</p>
            </div>
          </div>

          <div className="info-section">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Register</h3>
                <p>Create your account with basic details</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Book Token</h3>
                <p>Select doctor and book your appointment token</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Visit Doctor</h3>
                <p>Show your token number and get consultation</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Pay Online</h3>
                <p>Make payment securely through our platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
