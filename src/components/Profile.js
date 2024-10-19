import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
const [user, setUser] = useState({});
const [notes, setNotes] = useState([]);

useEffect(() => {
const fetchUserData = async () => {
    try {
    const res = await axios.get('http://localhost:5000/users/profile');
    setUser(res.data.user);
    setNotes(res.data.user.notes);
    } catch (err) {
    console.error('Error fetching user data:', err);
    }
};
fetchUserData();
}, []);

return (
<div className="profile-container">
    <h2>{user.username}'s Profile</h2>
    <img src={user.profilePic || 'default-avatar.png'} alt="Profile" />

    <p><strong>Bio:</strong> {user.bio}</p>

    <h3>Your Uploaded Notes</h3>
    <div className="notes-list">
    {notes.map((note) => (
        <div key={note._id} className="note-card">
        <h3>{note.title}</h3>
        <p>{note.description}</p>
        <a href={note.fileUrl} download>Download</a>
        </div>
    ))}
    </div>
</div>
);
};

export default Profile;
