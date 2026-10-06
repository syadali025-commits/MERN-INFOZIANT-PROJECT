import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/booking/doctor', {
        headers: {
          'Authorization': `Bearer ${userInfo?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/doctor/login');
  };

  const handleHome = () => {
    navigate('/doctor/home');
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
            <button className="nav-button active">📅 Appointments</button>
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
          <div className="appointments-container">
            <h2>Your Appointments</h2>
            <p className="appointments-subtitle">Your scheduled patient appointments</p>

            {loading ? (
              <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <div className="no-booking">
                <div className="no-booking-icon">📅</div>
                <h3>No Appointments Yet</h3>
                <p>You don't have any scheduled appointments.</p>
              </div>
            ) : (
              <div className="appointments-list">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-card">
                    <div className="appointment-time">{appointment.timeSlot}</div>
                    <div className="appointment-details">
                      <h3>{appointment.patientName}</h3>
                      <p>{appointment.symptoms}</p>
                      <p className="appointment-date">
                        {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className={`appointment-status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
