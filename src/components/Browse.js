import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Browse.css';

const Browse = () => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [unit, setUnit] = useState('');

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

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!semester || note.semester === semester) &&
        (!subject || note.subject === subject) &&
        (!unit || note.unit === unit)
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

            <div className="filters">
                <select onChange={handleFilterChange(setSemester)} value={semester}>
                    <option value="">Select Semester</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    {/* Add more semesters as needed */}
                </select>

                <select onChange={handleFilterChange(setSubject)} value={subject}>
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                    {/* Add more subjects as needed */}
                </select>

                <select onChange={handleFilterChange(setUnit)} value={unit}>
                    <option value="">Select Unit</option>
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    {/* Add more units as needed */}
                </select>
            </div>

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
