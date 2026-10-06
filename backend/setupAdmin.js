require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const setupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/docconnect');
    console.log('MongoDB connected');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@docconnect.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@docconnect.com',
      password: 'admin123'
    });

    console.log('Admin created successfully:');
    console.log('Email: admin@docconnect.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

setupAdmin();
