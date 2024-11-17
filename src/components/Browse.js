import React, { useState, useEffect } from 'react';
import './Browse.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [documents, setDocuments] = useState([]);

  // Fetch data from the backend when the component mounts or filters change
  useEffect(() => {
    const token = localStorage.getItem('authtoken'); // Changed 'token' to 'authtoken' based on your info
    console.log(token);

    // Build the query string with selected filters
    let query = `http://localhost:5050/notes?browse=true`;
if (selectedField) query += `&field=${selectedField}`;
if (selectedBranch) query += `&branch=${selectedBranch}`;
if (selectedCourse) query += `&course=${selectedCourse}`;

    axios
      .get(query, {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure `token` is the valid JWT
        },
      })
      .then(response => {
        console.log(response.data); // Check the response format
        setDocuments(response.data); // Update the state with the fetched documents
      })
      .catch(error => console.error("Error fetching documents:", error));
  }, [selectedField, selectedBranch, selectedCourse]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
          <option value="Reactions">Reactions</option>
          <option value="Networks">Networks</option>
          <option value="Drama">Drama</option>
          <option value="Flow">Flow</option>
        </select>
      </div>

      <div className="document-cards-container">
        {filteredDocuments.length === 0 ? (
          <p>No documents found. Try adjusting your search or filters.</p>
        ) : (
          filteredDocuments.map(doc => (
            <div key={doc._id} className="document-card">
              {/* Placeholder for document image */}
              <div className="document-image-placeholder"></div>
              
              <h3>{doc.title}</h3>
              
              <div className="document-info">
                <p>Field: {doc.field ? doc.field : 'N/A'}</p>
                <p>Branch: {doc.branch ? doc.branch : 'N/A'}</p>
                <p>Course: {doc.course ? doc.course : 'N/A'}</p>
              </div>
              
              <div className="actions">
                <Link
                  to={`/fileview/${doc._id}`}
                  className="action-link"
                >
                  File Details →
                </Link>
                <Link
                  to={`/document/${doc._id}`}  // Passing just the ID as part of the URL
                  className="action-link"
                >
                  View →
                </Link>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Browse;