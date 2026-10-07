import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Payment = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [bookingData, setBookingData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    const storedBooking = localStorage.getItem('pendingBooking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    } else {
      navigate('/patient/bookings');
    }
  }, [navigate]);

  const handlePayment = async () => {
    setPaymentStatus('processing');
    
    try {
      console.log('Sending booking data:', bookingData);
      
      // Map field names to match backend schema
      const bookingPayload = {
        patientName: bookingData.name,
        patientEmail: bookingData.patientEmail,
        patientPhone: bookingData.patientPhone,
        patientAge: bookingData.age,
        patientGender: bookingData.gender,
        patientWeight: bookingData.weight,
        symptoms: bookingData.symptoms,
        doctorId: bookingData.doctorId,
        doctorName: bookingData.doctorName,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        paymentStatus: 'paid'
      };
      
      console.log('Mapped booking payload:', bookingPayload);
      
      // Submit booking to backend
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        setTimeout(() => {
          setPaymentStatus('success');
          localStorage.removeItem('pendingBooking');
          localStorage.setItem('lastBooking', JSON.stringify(data));
        }, 2000);
      } else {
        alert(`Failed to create booking: ${data.message || 'Please try again.'}`);
        setPaymentStatus('pending');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
      setPaymentStatus('pending');
    }
  };

  const handleBack = () => {
    navigate('/patient/bookings');
  };

  const handleHome = () => {
    navigate('/patient/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/patient/login');
  };

  const handleContact = () => {
    navigate('/patient/contact');
  };

  const handleStatus = () => {
    navigate('/patient/status');
  };

  if (!bookingData) {
    return <div className="dashboard-container">Loading...</div>;
  }

  const doctorName = bookingData.doctorName || 'Selected Doctor';

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
            <button onClick={handleBack} className="nav-button">📅 Bookings</button>
            <button className="nav-button active">💳 Payment</button>
            <button onClick={handleStatus} className="nav-button">📈 Status</button>
          </nav>
          <div className="header-right">
            <button onClick={handleContact} className="header-button contact-button">📞 Contact</button>
            <button onClick={handleLogout} className="header-button logout-button">🚪 Logout</button>
            <button className="header-button user-profile-button">👤 {userInfo?.name || 'xyz'}</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="payment-container">
            <h2>Payment Details</h2>
            
            {paymentStatus === 'pending' && (
              <>
                <div className="payment-summary">
                  <h3>Booking Summary</h3>
                  <div className="summary-item">
                    <span>Patient Name:</span>
                    <span>{bookingData.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Doctor:</span>
                    <span>{doctorName}</span>
                  </div>
                  <div className="summary-item">
                    <span>Date:</span>
                    <span>{bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Time Slot:</span>
                    <span>{bookingData.timeSlot}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Consultation Fee:</span>
                    <span>₹200</span>
                  </div>
                </div>

                <div className="qr-section">
                  <h3>Scan QR Code to Pay</h3>
                  <div className="qr-placeholder">
                    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="10" width="60" height="60" fill="#1e3a8a"/>
                      <rect x="130" y="10" width="60" height="60" fill="#1e3a8a"/>
                      <rect x="10" y="130" width="60" height="60" fill="#1e3a8a"/>
                      <rect x="20" y="20" width="40" height="40" fill="white"/>
                      <rect x="140" y="20" width="40" height="40" fill="white"/>
                      <rect x="20" y="140" width="40" height="40" fill="white"/>
                      <rect x="30" y="30" width="20" height="20" fill="#1e3a8a"/>
                      <rect x="150" y="30" width="20" height="20" fill="#1e3a8a"/>
                      <rect x="30" y="150" width="20" height="20" fill="#1e3a8a"/>
                      <rect x="80" y="10" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="10" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="30" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="30" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="50" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="50" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="80" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="100" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="140" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="160" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="120" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="140" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="160" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="180" y="180" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="10" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="30" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="50" y="80" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="10" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="30" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="50" y="100" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="10" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="30" y="120" width="10" height="10" fill="#1e3a8a"/>
                      <rect x="50" y="120" width="10" height="10" fill="#1e3a8a"/>
                    </svg>
                    <p className="qr-text">UPI QR Code</p>
                  </div>
                </div>

                <button onClick={handlePayment} className="submit-button">
                  Confirm Payment of ₹200
                </button>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="payment-processing">
                <div className="spinner"></div>
                <p>Processing payment...</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Your booking has been confirmed.</p>
                <p className="booking-reference">Reference ID: {Date.now()}</p>
                <button onClick={handleStatus} className="submit-button">
                  View Booking Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
