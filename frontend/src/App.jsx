import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientLogin from './pages/patient/PatientLogin';
import PatientRegister from './pages/patient/PatientRegister';
import PatientDashboard from './pages/patient/PatientDashboard';
import Home from './pages/patient/Home';
import Bookings from './pages/patient/Bookings';
import Payment from './pages/patient/Payment';
import Status from './pages/patient/Status';
import Contact from './pages/patient/Contact';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorContact from './pages/doctor/DoctorContact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientLogin />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/home" element={<Home />} />
        <Route path="/patient/bookings" element={<Bookings />} />
        <Route path="/patient/payment" element={<Payment />} />
        <Route path="/patient/status" element={<Status />} />
        <Route path="/patient/contact" element={<Contact />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/home" element={<DoctorHome />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/schedule" element={<DoctorSchedule />} />
        <Route path="/doctor/contact" element={<DoctorContact />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
