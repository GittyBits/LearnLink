import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Browse.css';

const Browse = () => {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [unit, setUnit] = useState('');
    const [bookmarkedNotes, setBookmarkedNotes] = useState(() => {
        return JSON.parse(localStorage.getItem('bookmarkedNotes')) || {};
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/notes');
                setNotes(res.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching notes');
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    // Save bookmarks in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('bookmarkedNotes', JSON.stringify(bookmarkedNotes));
    }, [bookmarkedNotes]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleBookmark = (note) => {
        const updatedBookmarks = { ...bookmarkedNotes };
        if (updatedBookmarks[note._id]) {
            delete updatedBookmarks[note._id]; // Remove if already bookmarked
        } else {
            updatedBookmarks[note._id] = { ...note, lastPage: 1 }; // Bookmark with starting page
        }
        setBookmarkedNotes(updatedBookmarks);
    };

    const handleProgressUpdate = (noteId, page) => {
        if (bookmarkedNotes[noteId]) {
            setBookmarkedNotes({
                ...bookmarkedNotes,
                [noteId]: {
                    ...bookmarkedNotes[noteId],
                    lastPage: page
                }
            });
        }
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

            {/* Search and Filters */}
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
                    {/* Add more semesters */}
                </select>

                <select onChange={handleFilterChange(setSubject)} value={subject}>
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    {/* Add more subjects */}
                </select>

                <select onChange={handleFilterChange(setUnit)} value={unit}>
                    <option value="">Select Unit</option>
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    {/* Add more units */}
                </select>
            </div>

            {/* Loading and Error States */}
            {loading && <p>Loading notes...</p>}
            {error && <p>{error}</p>}

            {/* Notes List */}
            <div className="notes-list">
                {filteredNotes.length ? filteredNotes.map((note) => (
                    <div key={note._id} className="note-card">
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>

                        <button onClick={() => handleBookmark(note)}>
                            {bookmarkedNotes[note._id] ? 'Remove Bookmark' : 'Bookmark'}
                        </button>

                        {bookmarkedNotes[note._id] && (
                            <p>Last page viewed: {bookmarkedNotes[note._id].lastPage}</p>
                        )}

                        <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleProgressUpdate(note._id, 1)}>
                            Open PDF
                        </a>
                    </div>
                )) : <p>No notes found</p>}
            </div>

            {/* Bookmarked Notes */}
            <div className="bookmarked-notes">
                <h3>Bookmarked Notes</h3>
                {Object.keys(bookmarkedNotes).length ? (
                    Object.values(bookmarkedNotes).map(note => (
                        <div key={note._id} className="note-card">
                            <h4>{note.title}</h4>
                            <p>{note.description}</p>
                            <p>Last viewed page: {note.lastPage}</p>

                            <button onClick={() => handleBookmark(note)}>
                                Remove Bookmark
                            </button>

                            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleProgressUpdate(note._id, note.lastPage)}>
                                Resume at page {note.lastPage}
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No bookmarked notes</p>
                )}
            </div>
        </div>
    );
};

export default Browse;
