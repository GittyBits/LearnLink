const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  fileURL: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
