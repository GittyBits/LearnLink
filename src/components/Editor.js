import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editor.css';

function Editor() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve fileData and description from location state
  const { fileData, description } = location.state || {};

  // State for managing file, new file upload, and unique key for re-rendering
  const [file, setFile] = useState(fileData);
  const [newFile, setNewFile] = useState(null);
  const [key, setKey] = useState(0); // Key for forcing re-render

  // Handle navigating back to DocumentView
  const handleView = () => {
    navigate('/document', { state: { file, description } });
  };

  // Handle clearing all modifications and restoring the original file
  const handleClearAll = () => {
    setFile(null); // Temporarily clear the file
    setTimeout(() => {
      setFile(fileData); // Restore original fileData
      setKey(prevKey => prevKey + 1); // Update key to force re-render
    }, 0);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewFile(selectedFile);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!newFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      const response = await axios.post('http://localhost:5000/notes/upload', formData);
      setFile(newFile);
      alert('File uploaded successfully.');
      setNewFile(null);
    } catch (err) {
      alert('File upload failed.');
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="editor">
      {/* Document Header with View button aligned to the right */}
      <div className="editor-header">
        <h2>{description || 'Untitled Document - Editor'}</h2>
        <button className="view-btn" onClick={handleView}>
          <i className="fas fa-eye"></i> View
        </button>
      </div>

      {/* Document Display Area */}
      <div className="editor-content">
        {file ? (
          <div key={key} className="document-placeholder">
            <p>
              File uploaded: {file.name} &nbsp; &nbsp; Type: {file.type} &nbsp;
              &nbsp; Size: {(file.size / 1024).toFixed(2)} KB
            </p>

            {/* Render file based on type */}
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            {file.type === 'application/pdf' && (
              <iframe
                src={URL.createObjectURL(file)}
                title={file.name}
                width="100%"
                height="600px"
              />
            )}
          </div>
        ) : (
          <div className="document-placeholder">
            <p>No document available. Please upload a file first.</p>
          </div>
        )}
      </div>

      {/* Upload Button and Action Buttons */}
      <div className="editor-actions">
        <input type="file" onChange={handleFileChange} hidden id="file-upload-input" />
        <label htmlFor="file-upload-input" className="upload-btn">Upload New File</label>
        {newFile && (
          <button className="upload-btn" onClick={handleFileUpload}>Upload File</button>
        )}
        <button onClick={handleClearAll}>
          <i className="fas fa-eraser"></i> Clear All
        </button>
      </div>
    </div>
  );
}

export default Editor;
