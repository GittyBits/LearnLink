import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';  // Assuming a CSS file for custom styles

const Upload = () => {
const [file, setFile] = useState(null);
const [description, setDescription] = useState('');

const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
    const res = await axios.post('http://localhost:5000/notes/upload', formData);
    console.log(res.data);
    alert('File uploaded successfully');
    } catch (err) {
    console.error('Error uploading file:', err);
    alert('File upload failed');
    }
};

return (
    <div className="upload-container">
    <h2>Upload Your Notes</h2>
    <form onSubmit={handleSubmit}>
        <label htmlFor="file">Choose file:</label>
        <input type="file" id="file" onChange={handleFileChange} required />
        
        <label htmlFor="description">Description:</label>
        <textarea 
        id="description"
        rows="4" 
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        required 
        />

        <button type="submit">Upload</button>
    </form>
    </div>
);
};

export default Upload;
