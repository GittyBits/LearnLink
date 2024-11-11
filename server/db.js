const mongoose = require('mongoose');

// MongoDB URI for your 'learnlink' database
const mongoURI = 'mongodb://localhost:27017/learnlink'; 

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using mongoose without deprecated options
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure if connection fails
  }
};

module.exports = connectDB;
