// File model (models/File.js)
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalName: String,
  path: String,
  fileURL: String,
  fileSize: Number,
  fileType: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model('File', fileSchema);
