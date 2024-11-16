import React, { useState, useEffect } from 'react';
import './Browse.css';
import axios from 'axios';

function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [documents, setDocuments] = useState([]);

  // Fetch data from the backend when the component mounts or filters change
  useEffect(() => {
    const token = localStorage.getItem('token');  
    console.log('Token:', token);  // Debug to check the token

    // Build the query string with selected filters, but keep the query empty if no filter is set
    let query = `http://localhost:5050/notes?`;

    if (selectedField) query += `field=${selectedField}&`;
    if (selectedBranch) query += `branch=${selectedBranch}&`;
    if (selectedCourse) query += `course=${selectedCourse}&`;

    // Remove trailing '&' if present
    query = query.slice(0, -1);

    axios.get(query, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setDocuments(response.data);  // Store fetched documents in state
    })
    .catch(error => {
      console.error("Error fetching documents:", error);
    });
  }, [selectedField, selectedBranch, selectedCourse]);  // Fetch data when filters change

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;  // Only filter by search term, as the API already filters by field/branch/course
  });

  return (
    <div className="browse-page">
      <div className="browse-header">
        <input
          className="browse-search-bar"
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="browse-filters">
        <select className="browse-dropdown" onChange={e => setSelectedField(e.target.value)} value={selectedField}>
          <option value="">Field</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Arts">Arts</option>
        </select>
        <select className="browse-dropdown" onChange={e => setSelectedBranch(e.target.value)} value={selectedBranch}>
          <option value="">Branch</option>
          <option value="Pure Mathematics">Pure Mathematics</option>
          <option value="Applied Mathematics">Applied Mathematics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Literature">Literature</option>
        </select>
        <select className="browse-dropdown" onChange={e => setSelectedCourse(e.target.value)} value={selectedCourse}>
          <option value="">Course</option>
          <option value="Equations">Equations</option>
          <option value="Numbers">Numbers</option>
          <option value="Reactions">Reaction</option>
          <option value="Networks">Networks</option>
          <option value="Drama">Drama</option>
        </select>
      </div>

      <div className="document-cards">
        {filteredDocuments.length === 0 ? (
          <p>No documents found. Try adjusting your search or filters.</p>
        ) : (
          filteredDocuments.map(doc => (
            <div key={doc._id} className="document-card">
              <h3>{doc.title}</h3> {/* Use the title from the file model */}
              <p><strong>Branch:</strong> {doc.branch}</p>
              <p><strong>Likes:</strong> {doc.likes}</p>
              <p><strong>Comments:</strong> {doc.comments}</p>
              <p><strong>Field:</strong> {doc.field}</p>
              <p><strong>Course:</strong> {doc.course}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Browse;
