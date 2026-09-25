import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorLogin.css';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Doctor Login:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>DocConnect</h1>
          <p>Doctor Portal</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/doctor/register">Register as Doctor</a></p>
          <div className="role-buttons">
            <button className={`role-btn ${location.pathname === '/patient/login' || location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/patient/login')}>
              Patient
            </button>
            <button className={`role-btn ${location.pathname === '/doctor/login' ? 'active' : ''}`} onClick={() => navigate('/doctor/login')}>
              Doctor
            </button>
            <button className={`role-btn ${location.pathname === '/admin/login' ? 'active' : ''}`} onClick={() => navigate('/admin/login')}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
