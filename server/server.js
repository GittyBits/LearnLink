const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connectDB = require('./db');
const File = require('./models/File'); // Import the file model for MongoDB

const app = express();
const PORT = 5050;

// Apply CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  credentials: true // Include credentials if needed
}));

// Connect to MongoDB
connectDB();

// Create the uploads directory if it doesn’t exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/notes/uploads', express.static(uploadDir));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the uploadDir variable
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  }
});

const upload = multer({
  storage, // Use storage configuration
  limits: { fileSize: 20 * 1024 * 1024 } // Limit file size to 20MB
});

// File upload endpoint
app.post('/notes/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    // Create a new File document in MongoDB
    const newFile = new File({
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileURL: req.file.path, // Path to the uploaded file
    });

    try {
      await newFile.save(); // Save file metadata in MongoDB
      res.json({ file: req.file });
    } catch (err) {
      console.error('Error saving file to database:', err);
      res.status(500).json({ message: 'Error saving file to database' });
    }
  } else {
    res.status(400).json({ message: 'No file uploaded.' });
  }
});

// Retrieve file metadata from MongoDB
app.get('/notes', async (req, res) => {
  try {
    const files = await File.find(); // Retrieve all files from MongoDB
    res.json(files); // Send file metadata back to the frontend
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving files' });
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
