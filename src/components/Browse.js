import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Browse.css';

const Browse = () => {
const [notes, setNotes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
const fetchNotes = async () => {
    try {
    const res = await axios.get('http://localhost:5000/notes');
    setNotes(res.data);
    } catch (err) {
    console.error('Error fetching notes:', err);
    }
};
fetchNotes();
}, []);

const handleSearch = (e) => {
setSearchTerm(e.target.value);
};

const filteredNotes = notes.filter(note =>
note.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
<div className="browse-container">
    <h2>Browse Notes</h2>
    <input 
    type="text" 
    placeholder="Search notes..." 
    value={searchTerm}
    onChange={handleSearch}
    />

    <div className="notes-list">
    {filteredNotes.length ? filteredNotes.map((note) => (
        <div key={note._id} className="note-card">
        <h3>{note.title}</h3>
        <p>{note.description}</p>
        <a href={note.fileUrl} download>Download</a>
        </div>
    )) : <p>No notes found</p>}
    </div>
</div>
);
};

export default Browse;
