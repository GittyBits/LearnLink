import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './Profile.css';
import EditFilePage from './EditFilePage'; // Import the modal component for editing file info

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const navigate = useNavigate(); // Use navigation hook

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Fetch profile data
      axios
        .get('http://localhost:5050/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
          setUpdatedUserData(response.data);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err.response || err);
          setError(
            err.response?.status === 403
              ? 'Access denied: You do not have permission to view this profile.'
              : 'Unable to fetch profile data.'
          );
        });

      // Fetch user-specific uploads
      axios
        .get('http://localhost:5050/notes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUploads(response.data);
        })
        .catch((err) => {
          console.error('Error fetching uploads:', err.response || err);
          setError(
            err.response?.status === 403
              ? 'Access denied: You do not have permission to view uploads.'
              : 'Unable to fetch uploads.'
          );
        });
    } else {
      setError('No authentication token found.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(
        'http://localhost:5050/profile',
        updatedUserData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Unable to update profile data.');
    }
  };

  const handleEditFileInfo = (fileId) => {
    navigate(`/editfile/${fileId}`); // Navigate to the EditFilePage with the selected file ID
  };

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-info">
          <h2 className="username">{userData.fullName}</h2>
          <p className="userid">@{userData.email}</p>

          {editing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={updatedUserData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={updatedUserData.age || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  name="status"
                  value={updatedUserData.status || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Education:</label>
                <input
                  type="text"
                  name="education"
                  value={updatedUserData.education || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={updatedUserData.location || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Languages:</label>
                <input
                  type="text"
                  name="languages"
                  value={updatedUserData.languages || ''}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            <div className="profile-details">
              <p>
                <strong>AGE:</strong> {userData.age || 'N/A'}
              </p>
              <p>
                <strong>STATUS:</strong> {userData.status || 'N/A'}
              </p>
              <p>
                <strong>EDUCATION:</strong> {userData.education || 'N/A'}
              </p>
              <p>
                <strong>LOCATION:</strong> {userData.location || 'N/A'}
              </p>
              <p>
                <strong>LANGUAGES:</strong> {userData.languages || 'N/A'}
              </p>
            </div>
          )}

          <button onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="uploads-section">
        <h2>Your Uploaded Files</h2>
        <div className="uploads-grid">
          {uploads.map((upload) => (
            <div key={upload._id} className="upload-card">
              <h3>{upload.title}</h3>
              <p>Field: {upload.field}</p>
              <p>Branch: {upload.branch}</p>
              <p>Course: {upload.course}</p>
              <button className="editfile" onClick={() => handleEditFileInfo(upload._id)}>
                Edit Document Info
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
