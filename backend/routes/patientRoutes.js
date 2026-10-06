const express = require('express');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register new patient
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if patient already exists
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: 'Patient already registered with this email' });
    }

    // Create new patient
    const patient = await Patient.create({
      name,
      email,
      password,
      phone
    });

    // Generate token
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET || 'docconnect_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      role: 'patient',
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login patient
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await patient.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET || 'docconnect_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      role: 'patient',
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get patient profile (protected)
router.get('/profile', protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
