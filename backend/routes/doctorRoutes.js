const express = require('express');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Login doctor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if doctor is approved
    if (!doctor.isApproved) {
      return res.status(403).json({ message: 'Your account is pending approval from admin' });
    }

    // Check password
    const isMatch = await doctor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: doctor._id, role: 'doctor' },
      process.env.JWT_SECRET || 'docconnect_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization,
      role: 'doctor',
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register doctor (for admin to approve)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience, qualification } = req.body;

    // Check if doctor already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already registered with this email' });
    }

    // Create new doctor (not approved by default)
    const doctor = await Doctor.create({
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      qualification,
      isApproved: false
    });

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      message: 'Registration successful. Please wait for admin approval.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor profile (protected)
router.get('/profile', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select('-password');
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
