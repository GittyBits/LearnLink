const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/learnlink'; // Using 'learnlink' as the database name

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI); // No options needed here
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
