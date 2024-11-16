// File model (models/File.js)
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  title: { type: String, required: true }, // Alias name field
  path: { type: String, required: true },
  fileURL: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  field: { type: String, required: true },
  branch: { type: String, required: true },
  course: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
