const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create new booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    const {
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender,
      patientWeight,
      symptoms,
      doctorId,
      doctorName,
      date,
      timeSlot,
      paymentStatus
    } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const booking = await Booking.create({
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender,
      patientWeight,
      symptoms,
      doctorId,
      doctorName,
      date,
      timeSlot,
      paymentStatus: paymentStatus || 'paid',
      status: 'confirmed'
    });

    console.log('Booking created successfully:', booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get bookings for a specific doctor (protected)
router.get('/doctor', protect, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Doctors only.' });
    }

    const bookings = await Booking.find({ doctorId: req.user.id })
      .sort({ date: 1, timeSlot: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get bookings for a specific patient (protected)
router.get('/patient', protect, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied. Patients only.' });
    }

    const bookings = await Booking.find({ patientEmail: req.user.email })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (doctor only)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Doctors only.' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify doctor owns this booking
    if (booking.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You can only update your own bookings.' });
    }

    booking.status = req.body.status || booking.status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
