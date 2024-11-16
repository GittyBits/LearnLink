import React from 'react';
import './starr.css'; // Make sure to create CSS styles similar to the layout in the image

const documents = Array(16).fill({
  title: "title of document",
  likes: 1069,
  comments: 57,
  field: "Engineering",
  branch: "Computer Science",
  tags: ["Racing", "Reading", "Reading", "Reading"],
});

function DocumentCard({ title, likes, comments, field, branch, tags }) {
  return (
    <div className="document-card">
      <div className="document-image-placeholder"></div>
      <h3>{title}</h3>
      <div className="document-info">
        <p>❤️ {likes}</p>
        <p>💬 {comments}</p>
        <p>Field: {field}</p>
        <p>Branch: {branch}</p>
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="actions">
        <a href="/document" className="action-link">view →</a>
      </div>
    </div>
  );
}

function star() {
  return (
    <div className="stars">
      <header>
        <h1>Starred Documents</h1>
      </header>
      <main>
        <p>Total Starred: {documents.length}</p>
        <div className="document-grid">
          {documents.map((doc, index) => (
            <DocumentCard key={index} {...doc} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default star;
