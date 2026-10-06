const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();

const doctors = [
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@docconnect.com',
    password: 'doctor123',
    phone: '9876543210',
    specialization: 'General Physician',
    experience: 15,
    qualification: 'MBBS, MD',
    isApproved: true
  },
  {
    name: 'Dr. Priya Sharma',
    email: 'priya@docconnect.com',
    password: 'doctor123',
    phone: '9876543211',
    specialization: 'Cardiologist',
    experience: 12,
    qualification: 'MBBS, MD (Cardiology)',
    isApproved: true
  },
  {
    name: 'Dr. Amit Patel',
    email: 'amit@docconnect.com',
    password: 'doctor123',
    phone: '9876543212',
    specialization: 'Dermatologist',
    experience: 10,
    qualification: 'MBBS, MD (Dermatology)',
    isApproved: true
  },
  {
    name: 'Dr. Sunita Reddy',
    email: 'sunita@docconnect.com',
    password: 'doctor123',
    phone: '9876543213',
    specialization: 'Pediatrician',
    experience: 8,
    qualification: 'MBBS, MD (Pediatrics)',
    isApproved: true
  },
  {
    name: 'Dr. Vikram Singh',
    email: 'vikram@docconnect.com',
    password: 'doctor123',
    phone: '9876543214',
    specialization: 'Orthopedic',
    experience: 18,
    qualification: 'MBBS, MS (Orthopedics)',
    isApproved: true
  },
  {
    name: 'Dr. Anjali Mehta',
    email: 'anjali@docconnect.com',
    password: 'doctor123',
    phone: '9876543215',
    specialization: 'Gynecologist',
    experience: 14,
    qualification: 'MBBS, MD (Gynecology)',
    isApproved: true
  },
  {
    name: 'Dr. Rahul Verma',
    email: 'rahul@docconnect.com',
    password: 'doctor123',
    phone: '9876543216',
    specialization: 'Neurologist',
    experience: 16,
    qualification: 'MBBS, MD (Neurology)',
    isApproved: true
  }
];

const setupDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/docconnect');
    console.log('MongoDB connected');

    // Clear existing doctors (optional - comment out if you want to keep existing)
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Add doctors
    for (const doctor of doctors) {
      const newDoctor = await Doctor.create(doctor);
      console.log(`Created doctor: ${newDoctor.name} (${newDoctor.email})`);
    }

    console.log('\nDoctor setup completed successfully!');
    console.log('\nDoctor Login Credentials:');
    console.log('============================');
    doctors.forEach(doc => {
      console.log(`Name: ${doc.name}`);
      console.log(`Email: ${doc.email}`);
      console.log(`Password: ${doc.password}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error setting up doctors:', error);
    process.exit(1);
  }
};

setupDoctors();
