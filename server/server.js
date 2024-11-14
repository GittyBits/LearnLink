// Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the DB connection function
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
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Add PUT here
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB (using db.js for modular connection logic)
connectDB();

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
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to avoid overwriting files
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
    console.log('New User to save:', newUser); // Log the new user object

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
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

// Profile route (requires authentication)
app.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Fetch user info excluding password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload route (requires authentication)
// File upload route (requires authentication)
app.post('/notes/upload', authenticate, upload.single('file'), async (req, res) => {
  const { field, branch, course } = req.body; // Get field, branch, and course from the request body

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!field || !branch || !course) {
    return res.status(400).json({ message: 'Field, branch, and course are required' });
  }

  // Save the file details to the database (optional)
  const newFile = new File({
    userId: req.userId,
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path,
    fileURL: req.file.path,
    fileSize: req.file.size,
    fileType: req.file.mimetype,
    field,   // Add field to the database record
    branch,  // Add branch to the database record
    course   // Add course to the database record
  });

  try {
    await newFile.save(); // Save file details to MongoDB
    console.log('Uploaded file details:', req.file); // Log uploaded file details for troubleshooting

    res.json({ message: 'File uploaded successfully', file: req.file });
  } catch (err) {
    console.error('Error saving file details:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Notes retrieval route (requires authentication)
app.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await File.find({ userId: req.userId }); // Fetch notes for the logged-in user
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Error fetching notes from database' });
  }
});
// Update Profile Route (requires authentication)
app.put('/profile', authenticate, async (req, res) => {
  const { fullName, age, status, education, location, languages } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { fullName, age, status, education, location, languages },
      { new: true }  // Return the updated document
    ).select('-password'); // Exclude password from the returned document

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Error handling middleware for multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  } else if (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});