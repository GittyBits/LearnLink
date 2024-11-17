import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./FileDetails.css"

const FileDetails = () => {
  const { fileId } = useParams(); // Get the file ID from the URL
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get(`http://localhost:5050/notes/${fileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => setFileData(response.data))
        .catch(err => setError('Unable to fetch file details.'));
    } else {
      setError('No authentication token found.');
    }
  }, [fileId]);

  if (error) return <div className="error-message">{error}</div>;
  if (!fileData) return <div className="loading-message">Loading...</div>;

  return (
    <div className="file-details-page">
      <h2 className="file-title">{fileData.title}</h2>
      <div className="file-info">
        <div className="file-info-row">
          <strong>Field:</strong>
          <span>{fileData.field}</span>
        </div>
        <div className="file-info-row">
          <strong>Original Filename:</strong>
          <span>{fileData.originalName}</span>
        </div>
        <div className="file-info-row">
          <strong>Branch:</strong>
          <span>{fileData.branch}</span>
        </div>
        <div className="file-info-row">
          <strong>File Size:</strong>
          <span>{(fileData.fileSize / 1024).toFixed(2)} KB</span>
        </div>
        <div className="file-info-row">
          <strong>Course:</strong>
          <span>{fileData.course}</span>
        </div>
        
        <div className="file-info-row">
          <strong>File Type:</strong>
          <span>{fileData.fileType}</span>
        </div>
        
      </div>
      <Link to="/browse" className="back-link">← Back to Browse</Link>
    </div>
  );
};

export default FileDetails;
