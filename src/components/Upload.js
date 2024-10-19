import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';  // Assuming a CSS file for custom styles
import { FaFileAlt } from 'react-icons/fa';  // File icon from react-icons

const Upload = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle drag and drop file selection
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();  // Prevent the default behavior
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    // Allow drag events
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle file upload on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:5000/notes/upload', formData);
            alert('File uploaded successfully');
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('File upload failed');
        } finally {
            navigate('/profile');  // Redirect to profile page in both success and failure cases
        }
    };

    // Navigate to the editor page
    const goToEditor = () => {
        navigate('/editor');
    };

    return (
        <div className="upload-container">
            <div className="upload-content">
                {/* Title Field */}
                <label htmlFor="title" className="upload-label">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    className="upload-input" 
                    placeholder="Enter a title"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />

                {/* Drag and Drop Area */}
                <div 
                    className="drag-drop-area" 
                    onDrop={handleDrop} 
                    onDragOver={handleDragOver}
                >
                    {file ? (
                        <div className="file-info">
                            <FaFileAlt className="file-icon" />
                            <span className="file-name">{file.name}</span>
                        </div>
                    ) : (
                        <>
                            <p>Drag and drop file to upload</p>
                            <p>or</p>
                            <label className="upload-button">
                                <input type="file" onChange={handleFileChange} hidden />
                                Upload from your device
                            </label>
                        </>
                    )}
                </div>

                {/* Editor and Publish Buttons */}
                <div className="button-container">
                    <button onClick={goToEditor} className="action-button">Editor</button>
                    <button onClick={handleSubmit} className="action-button">Publish</button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
