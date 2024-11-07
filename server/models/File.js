const mongoose = require('mongoose');

// Define schema for the file metadata
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileURL: {
    type: String,
    required: true
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
