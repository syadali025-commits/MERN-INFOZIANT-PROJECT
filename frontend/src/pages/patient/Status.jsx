import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Status = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
      setBookingData(JSON.parse(lastBooking));
    }
  }, []);

  const handleHome = () => {
    navigate('/patient/home');
  };

  const handleBookings = () => {
    navigate('/patient/bookings');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/patient/login');
  };

  const handleContact = () => {
    navigate('/patient/contact');
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
            <button onClick={handleBookings} className="nav-button">📅 Bookings</button>
            <button onClick={handleBookings} className="nav-button">💳 Payment</button>
            <button className="nav-button active">📈 Status</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👤 {userInfo?.name || 'xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="status-container">
            <h2>Booking Status</h2>
            
            {bookingData ? (
              <div className="status-card">
                <div className="status-header">
                  <div className="status-icon confirmed">✓</div>
                  <h3>Booking Confirmed</h3>
                </div>
                
                <div className="status-details">
                  <div className="status-item">
                    <span>Patient Name:</span>
                    <span>{bookingData.name}</span>
                  </div>
                  <div className="status-item">
                    <span>Doctor:</span>
                    <span>{bookingData.doctorName}</span>
                  </div>
                  <div className="status-item">
                    <span>Date:</span>
                    <span>{bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}</span>
                  </div>
                  <div className="status-item">
                    <span>Time Slot:</span>
                    <span>{bookingData.timeSlot}</span>
                  </div>
                  <div className="status-item">
                    <span>Payment Status:</span>
                    <span className="status-paid">Paid</span>
                  </div>
                  <div className="status-item">
                    <span>Amount:</span>
                    <span>₹200</span>
                  </div>
                </div>

                <button onClick={handleBookings} className="submit-button">
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <div className="no-booking">
                <div className="no-booking-icon">📋</div>
                <h3>No Recent Bookings</h3>
                <p>You haven't made any recent bookings.</p>
                <button onClick={handleBookings} className="submit-button">
                  Book an Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
