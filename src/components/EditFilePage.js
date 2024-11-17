import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import './EditFilePage.css';

const EditFilePage = () => {
  const { fileId } = useParams(); // Get the fileId from the URL parameters
  const [fileData, setFileData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Fetch the file details using the fileId from the URL
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileData({ ...fileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(
        `http://localhost:5050/notes/${fileId}`,
        fileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/profile'); // Redirect back to profile page after saving
    } catch (err) {
      setError('Unable to update file data.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!fileData) return <div>Loading...</div>;

  return (
    <div className="edit-file-page">
      <h2>Edit File Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>File Name:</label>
          <input
            type="text"
            name="title"
            value={fileData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            value={fileData.branch}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Semester:</label>
          <input
            type="text"
            name="semester"
            value={fileData.semester}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditFilePage;
