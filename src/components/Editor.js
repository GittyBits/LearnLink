import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editor.css';

function Editor() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fileData, description } = location.state || {};
  const [file, setFile] = useState(fileData);
  const [newFile, setNewFile] = useState(null);
  const [key, setKey] = useState(0);

  const handleView = () => {
    navigate('/document', { state: { file, description } });
  };

  const handleClearAll = () => {
    setFile(null);
    setTimeout(() => {
      setFile(fileData);
      setKey(prevKey => prevKey + 1);
    }, 0);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!newFile) {
      alert('Please select a file first.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('No authentication token found.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      const response = await axios.post('http://localhost:5050/notes/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(newFile);
      alert('File uploaded successfully.');
      setNewFile(null);
      console.log('Upload response:', response.data); // Log server response
    } catch (err) {
      alert('File upload failed.');
      console.error('Error uploading file:', err.response?.data || err.message); // More detailed error logging
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <h2>{description || 'Untitled Document - Editor'}</h2>
        <button className="view-btn" onClick={handleView}>
          <i className="fas fa-eye"></i> View
        </button>
      </div>

      <div className="editor-content">
        {file ? (
          <div key={key} className="document-placeholder">
            <p>
              File uploaded: {file.name} &nbsp; &nbsp; Type: {file.type} &nbsp;
              &nbsp; Size: {(file.size / 1024).toFixed(2)} KB
            </p>
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
