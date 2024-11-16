import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image for preview

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Fetch profile data
      axios.get('http://localhost:5050/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        setUpdatedUserData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err.response || err);
        setError(err.response?.status === 403 ? 'Access denied: You do not have permission to view this profile.' : 'Unable to fetch profile data.');
      });

      // Fetch uploads
      axios.get('http://localhost:5050/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUploads(response.data);
      })
      .catch((err) => {
        console.error('Error fetching uploads:', err.response || err);
        setError(err.response?.status === 403 ? 'Access denied: You do not have permission to view uploads.' : 'Unable to fetch uploads.');
      });
    } else {
      setError('No authentication token found.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview selected image
      setSelectedImage(URL.createObjectURL(file));

      // Create FormData to send the image to the backend
      const formData = new FormData();
      formData.append('profileImage', file);

      const token = localStorage.getItem('authToken');
      
      // Upload the image
      axios.post('http://localhost:5050/profile/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Profile picture updated:', response.data);
        
        // Update the user data with the new profile picture path
        setUserData(prevData => ({
          ...prevData,
          profilePicture: response.data.profilePicture // Save the URL of the uploaded image
        }));

        // Update the preview image if it was selected
        setSelectedImage(URL.createObjectURL(file)); // Keep the preview image until reloaded
      })
      .catch(err => {
        console.error('Error uploading profile image:', err);
        setError('Unable to update profile picture.');
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put('http://localhost:5050/profile', updatedUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Unable to update profile data.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-info">
          <div className="profile-image">
            {/* Display profile image */}
            <img 
              src={selectedImage || userData.profilePicture || 'default-profile-image.png'} 
              alt="Profile" 
              className="profile-img"
            />
            <label className="edit-photo">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfileImageChange} 
                style={{ display: 'none' }} 
              />
              <span>Change Photo</span>
            </label>
          </div>

          <h2 className="username">{userData.fullName}</h2>
          <p className="userid">@{userData.email}</p>

          {editing ? (
            <form onSubmit={handleSubmit}>
              <div><label>Full Name:</label><input type="text" name="fullName" value={updatedUserData.fullName} onChange={handleChange} /></div>
              <div><label>Age:</label><input type="number" name="age" value={updatedUserData.age || ''} onChange={handleChange} /></div>
              <div><label>Status:</label><input type="text" name="status" value={updatedUserData.status || ''} onChange={handleChange} /></div>
              <div><label>Education:</label><input type="text" name="education" value={updatedUserData.education || ''} onChange={handleChange} /></div>
              <div><label>Location:</label><input type="text" name="location" value={updatedUserData.location || ''} onChange={handleChange} /></div>
              <div><label>Languages:</label><input type="text" name="languages" value={updatedUserData.languages || ''} onChange={handleChange} /></div>
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            <div className="profile-details">
              <p><strong>AGE:</strong> {userData.age || 'N/A'}</p>
              <p><strong>STATUS:</strong> {userData.status || 'N/A'}</p>
              <p><strong>EDUCATION:</strong> {userData.education || 'N/A'}</p>
              <p><strong>LOCATION:</strong> {userData.location || 'N/A'}</p>
              <p><strong>LANGUAGES:</strong> {userData.languages || 'N/A'}</p>
            </div>
          )}

          <div className="profile-quote"><p>"{userData.quote || 'No quote set.'}"</p></div>
          <button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit Profile'}</button>
        </div>

        <div className="badges-section">
          <h3>Badges</h3>
          <div className="badges-grid">
            {userData.badges?.length ? userData.badges.map((badge, index) => (
              <div className="badge" key={index}>
                <img src={badge.image} alt={badge.name} />
                <p>{badge.name}</p>
              </div>
            )) : <p>No badges earned yet.</p>}
          </div>
        </div>
      </div>

      <div className="uploads-section">
        <h2>Community Uploads</h2>
        <p>Total Uploads: {uploads.length}</p>
        <div className="uploads-grid">
          {uploads.map((upload, index) => (
            <div className="upload-card" key={index}>
              <div className="upload-preview"></div>
              <h3>{upload.title || 'N/A'}</h3>
              <p>Field: {upload.field || 'N/A'}</p>
              <p>Branch: {upload.branch || 'N/A'}</p>
              <p><strong>Course:</strong> {upload.course || 'N/A'}</p>
              <div className="tags">
                {upload.tags?.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
              </div>
              <div className="card-footer">
                <span>{upload.likes} Likes</span> <span>{upload.views} Views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
