import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Bookings = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    age: '',
    gender: '',
    weight: '',
    symptoms: '',
    doctor: ''
  });

  const doctors = [
    { id: '6ac4bcefc2e0aa88256a9bdb', name: 'Dr. Rajesh Kumar', specialization: 'General Physician' },
    { id: '6ac4bcf0c2e0aa88256a9bdc', name: 'Dr. Priya Sharma', specialization: 'Cardiologist' },
    { id: '6ac4bcf0c2e0aa88256a9bdd', name: 'Dr. Amit Patel', specialization: 'Dermatologist' },
    { id: '6ac4bcf0c2e0aa88256a9bde', name: 'Dr. Sunita Reddy', specialization: 'Pediatrician' },
    { id: '6ac4bcf0c2e0aa88256a9bdf', name: 'Dr. Vikram Singh', specialization: 'Orthopedic' },
    { id: '6ac4bcf0c2e0aa88256a9be0', name: 'Dr. Anjali Mehta', specialization: 'Gynecologist' },
    { id: '6ac4bcf0c2e0aa88256a9be1', name: 'Dr. Rahul Verma', specialization: 'Neurologist' }
  ];

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', formData);
    setShowDateSelection(true);
  };

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDateSubmit = () => {
    if (selectedDate) {
      setShowDateSelection(false);
      setShowTimeSlots(true);
    } else {
      alert('Please select a date');
    }
  };

  const handleSlotSelect = async (slot) => {
    setSelectedSlot(slot);
    const selectedDoctor = doctors.find(d => d.id === formData.doctor);
    const userPhone = localStorage.getItem('userPhone') || '';
    const bookingData = {
      ...formData,
      date: selectedDate,
      timeSlot: slot,
      doctorId: selectedDoctor?.id || formData.doctor,
      doctorName: selectedDoctor?.name || 'Selected Doctor',
      patientEmail: userInfo?.email || '',
      patientPhone: userPhone
    };
    console.log('Final Booking:', bookingData);
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    navigate('/patient/payment');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/patient/login');
  };

  const handleContact = () => {
    navigate('/patient/contact');
  };

  const handleHome = () => {
    navigate('/patient/home');
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
            <button onClick={handleHome} className="nav-button">🏠 Home</button>
            <button className="nav-button active">📅 Bookings</button>
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
          <div className="booking-form-container">
            <h2>Book Your Appointment</h2>
            <p>Please fill in your details to book a token</p>

            {!showDateSelection && !showTimeSlots ? (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter your weight"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="doctor">Select Doctor</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="symptoms">Symptoms / Reason for Visit</label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="Describe your symptoms or reason for visit"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">Submit Booking</button>
              </form>
            ) : showDateSelection ? (
              <div className="date-selection-container">
                <h3>Select Appointment Date</h3>
                <p className="date-selection-subtitle">Choose your preferred date</p>
                <div className="date-picker-wrapper">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateSelect}
                    className="date-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <button onClick={handleDateSubmit} className="submit-button">
                  Continue to Time Slots
                </button>
                <button
                  className="back-button"
                  onClick={() => setShowDateSelection(false)}
                >
                  ← Back to Form
                </button>
              </div>
            ) : (
              <div className="time-slots-container">
                <h3>Select Your Preferred Time Slot</h3>
                <p className="time-slots-subtitle">Available slots for</p>
                <p className="selected-date-display">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="time-slots-grid">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button
                  className="back-button"
                  onClick={() => {
                    setShowTimeSlots(false);
                    setShowDateSelection(true);
                  }}
                >
                  ← Back to Date Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
