const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileURL: { type: String, required: true }, // Save file path or URL
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
