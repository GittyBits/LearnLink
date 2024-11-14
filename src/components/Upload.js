import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';
import { FaFileAlt, FaTimes } from 'react-icons/fa';

const Upload = ({ isSidenavOpen }) => {
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => setFileData(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('field', selectedField);
        formData.append('branch', selectedBranch);
        formData.append('course', selectedCourse);
    
        // Retrieve token from localStorage or another secure location
        const token = localStorage.getItem('authToken'); // Ensure this matches your token's storage location
    
        try {
            await axios.post('http://localhost:5050/notes/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Include the token in the request headers
                }
            });
            alert('File uploaded successfully');
            setFile(null);
            setDescription('');
            setSelectedField('');
            setSelectedBranch('');
            setSelectedCourse('');
        } catch (err) {
            setError('File upload failed');
            console.error('Error uploading file:', err);
        } finally {
            setLoading(false);
            navigate('/profile');
        }
    };
    

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        handleFileChange(e);
    };

    return (
        <div className={`upload-container ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'}`}>
            <div className="upload-content">
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

                <div className="dropdown-row">
                    <select
                        className="browse-dropdown"
                        value={selectedField}
                        onChange={e => setSelectedField(e.target.value)}
                    >
                        <option value="">Field</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Arts">Arts</option>
                    </select>

                    <select
                        className="browse-dropdown"
                        value={selectedBranch}
                        onChange={e => setSelectedBranch(e.target.value)}
                    >
                        <option value="">Branch</option>
                        <option value="Pure Mathematics">Pure Mathematics</option>
                        <option value="Applied Mathematics">Applied Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Literature">Literature</option>
                    </select>

                    <select
                        className="browse-dropdown"
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Course</option>
                        <option value="Equations">Equations</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Reactions">Reactions</option>
                        <option value="Networks">Networks</option>
                        <option value="Drama">Drama</option>
                        <option value="Flow">Flow</option>
                    </select>
                </div>

                <div
                    className={`drag-drop-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current.click()}
                >
                    {file ? (
                        <div className="file-info">
                            <FaFileAlt className="file-icon" />
                            <span className="file-name">{file.name}</span>
                            <FaTimes className="remove-file" onClick={() => setFile(null)} />
                        </div>
                    ) : (
                        <>
                            <p>Drag and drop file to upload</p>
                            <label className="upload-button">
                                <input type="file" ref={inputRef} onChange={handleFileChange} hidden />
                                Upload from your device
                            </label>
                        </>
                    )}
                </div>
                {error && <div className="error-message">{error}</div>}

                <div className="button-container">
                    <button onClick={handleSubmit} className="action-button" disabled={!file || loading}>
                        {loading ? 'Uploading...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
