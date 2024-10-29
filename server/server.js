const express = require('express');
const cors = require('cors'); // Import cors
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Apply CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  credentials: true // Include credentials if needed
}));

// Create the uploads directory if it doesn’t exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/notes/uploads', express.static(uploadDir));

// Multer configuration
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
app.post('/notes/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('Uploaded file:', req.file); // Log the uploaded file information

  // Optionally, you can return the file details to the client
  res.json({
    message: 'File uploaded successfully.',
    file: req.file
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
