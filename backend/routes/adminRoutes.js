const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'docconnect_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pending doctor approvals (protected)
router.get('/pending-doctors', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    const pendingDoctors = await Doctor.find({ isApproved: false }).select('-password');
    res.json(pendingDoctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve doctor (protected)
router.put('/approve-doctor/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select('-password');

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create initial admin (should be called once to setup)
router.post('/setup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      message: 'Admin created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
