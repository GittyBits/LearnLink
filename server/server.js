const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import the User model
const File = require('./models/File'); // Import the File model for MongoDB

const app = express();
const PORT = 5050;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/learnlink') // Remove deprecated options
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// File upload directory setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/notes/uploads', express.static(uploadDir)); // Serve static files from 'uploads' directory

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // Limit file size to 20MB
});

// Middleware to verify JWT token for protected routes
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Signup route
app.post('/users/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const newUser = new User({ fullName, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin route
app.post('/users/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload endpoint
app.post('/notes/upload', authenticate, upload.single('file'), async (req, res) => {
  if (req.file) {
    console.log('File received:', req.file);  // Log the received file
    const newFile = new File({
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileURL: req.file.path, // Save file path in MongoDB
    });

    try {
      await newFile.save(); // Save file metadata in MongoDB
      res.json({ file: req.file });
    } catch (err) {
      console.error('Error saving file to database:', err);
      res.status(500).json({ message: 'Error saving file to database' });
    }
  } else {
    console.log('No file uploaded');
    res.status(400).json({ message: 'No file uploaded.' });
  }
});

// Profile route (requires authentication)
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Welcome to your profile' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
