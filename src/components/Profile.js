import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);

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
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setError('Unable to fetch profile data.');
        });

      // Fetch user uploads
      axios
        .get('http://localhost:5050/notes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUploads(response.data);
        })
        .catch((err) => {
          console.error('Error fetching uploads:', err);
          setError('Unable to fetch uploads.');
        });
    } else {
      setError('No authentication token found.');
    }

    // Hide TopNav and SideNav when component mounts
    const topNav = document.querySelector('.topnav');
    const sideNav = document.querySelector('.sidenav');
    if (topNav) topNav.style.display = 'none';
    if (sideNav) sideNav.style.display = 'none';

    return () => {
      if (topNav) topNav.style.display = 'flex';
      if (sideNav) sideNav.style.display = 'block';
    };
  }, []);

  if (error) return <div>{error}</div>;

  if (!userData) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="profile-page">
      <div className="topnav" style={{ display: 'none' }}>
        <div className="brand" onClick={() => window.location.href = '/'}>
          LearnLink
        </div>
      </div>
      <div className="profile-sidebar">
        <div className="profile-info">
          <div className="profile-image"></div>
          <h2 className="username">{userData.fullName}</h2>
          <p className="userid">@{userData.email}</p>
          <div className="profile-details">
            <p><strong>AGE:</strong> {userData.age || 'N/A'}</p>
            <p><strong>GENDER:</strong> {userData.gender || 'N/A'}</p>
            <p><strong>STATUS:</strong> {userData.status || 'N/A'}</p>
            <p><strong>EDUCATION:</strong> {userData.education || 'N/A'}</p>
            <p><strong>LOCATION:</strong> {userData.location || 'N/A'}</p>
            <p><strong>LANGUAGES:</strong> {userData.languages || 'N/A'}</p>
          </div>
          <div className="profile-quote">
            <p>"{userData.quote || 'No quote set.'}"</p>
          </div>
        </div>
        <div className="profile-bio">
          <h3>Bio</h3>
          <p>{userData.bio || 'No bio available.'}</p>
        </div>
        <div className="profile-badges">
          <h3>Badges</h3>
          <div className="badges-list">
            {userData.badges?.map((badge, index) => (
              <div className="badge" key={index}>{badge}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="uploads-section">
        <h2>Community uploads</h2>
        <p>Total Uploads: {uploads.length}</p>
        <div className="uploads-grid">
          {uploads.map((upload, index) => (
            <div className="upload-card" key={index}>
              <div className="upload-preview"></div>
              <h4>{upload.fileName}</h4>
              <p>Field: {upload.field || 'N/A'}</p>
              <p>Branch: {upload.branch || 'N/A'}</p>
              <div className="tags">
                {upload.tags?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
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
