import React, { useState } from 'react';
import './Browse.css';

const documentData = [
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
  { title: "Algebra Basics", likes: 456, comments: 23, field: "Math", branch: "Pure Mathematics", tags: ["Equations", "Numbers"] },
  { title: "Organic Chemistry", likes: 789, comments: 56, field: "Science", branch: "Chemistry", tags: ["Reactions", "Compounds"] },
  { title: "Computer Networks", likes: 123, comments: 34, field: "Engineering", branch: "Computer Science", tags: ["Networks", "TCP/IP"] },
  { title: "Shakespearean Plays", likes: 654, comments: 12, field: "Arts", branch: "Literature", tags: ["Drama", "Classics"] },
  { title: "Calculus II", likes: 321, comments: 45, field: "Math", branch: "Applied Mathematics", tags: ["Derivatives", "Integration"] },
  { title: "Fluid Dynamics", likes: 876, comments: 67, field: "Engineering", branch: "Mechanical Engineering", tags: ["Physics", "Flow"] },
];

function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const filteredDocuments = documentData.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField ? doc.field === selectedField : true;
    const matchesBranch = selectedBranch ? doc.branch === selectedBranch : true;
    const matchesCourse = selectedCourse ? doc.tags.includes(selectedCourse) : true;
    return matchesSearch && matchesField && matchesBranch && matchesCourse;
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
        <select className="browse-dropdown" onChange={e => setSelectedField(e.target.value)}>
          <option value="">Field</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Arts">Arts</option>
        </select>
        <select className="browse-dropdown" onChange={e => setSelectedBranch(e.target.value)}>
          <option value="">Branch</option>
          <option value="Pure Mathematics">Pure Mathematics</option>
          <option value="Applied Mathematics">Applied Mathematics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Literature">Literature</option>
        </select>
        <select className="browse-dropdown" onChange={e => setSelectedCourse(e.target.value)}>
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
        {filteredDocuments.map((doc, index) => (
          <div key={index} className="document-card">
            <h3 className="document-title">{doc.title}</h3>
            <div className="document-preview"></div>
            <div className="document-info">
              <div className="document-meta">
                <span className="likes">❤️ {doc.likes}</span>
                <span className="comments">💬 {doc.comments}</span>
              </div>
              <p className="document-field-branch">{doc.field} - {doc.branch}</p>
              <div className="document-tags">
                {doc.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="document-actions">
              <a href="#" className="open-editor">Open in Editor</a>
              <a href="#" className="view-document">View</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
