import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FileDetails = () => {
  const { fileId } = useParams();  // Get the file ID from the URL
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/file-details/${fileId}`)
      .then(response => {
        setFileData(response.data);
      })
      .catch(err => {
        console.error('Error fetching file details:', err);
        setError('Unable to fetch file details.');
      });
  }, [fileId]);

  if (error) return <div>{error}</div>;
  if (!fileData) return <div>Loading...</div>;

  return (
    <div className="file-details-page">
      <h2>{fileData.title}</h2>
      <p><strong>Field:</strong> {fileData.field}</p>
      <p><strong>Branch:</strong> {fileData.branch}</p>
      <p><strong>Course:</strong> {fileData.course}</p>
      <p><strong>Tags:</strong> {fileData.tags.join(', ')}</p>
      <p><strong>Description:</strong> {fileData.description}</p>
    </div>
  );
};

export default FileDetails;
