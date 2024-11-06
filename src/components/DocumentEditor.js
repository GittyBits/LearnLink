import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './DocumentEditor.css';

function DocumentEditor() {
  const location = useLocation();
  const { file: initialFile, description } = location.state || {};

  const [file, setFile] = useState(initialFile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [comments, setComments] = useState([]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className="document-editor">
      <div className="header">
        <h2>{description || 'Document'}</h2>
        <button onClick={toggleEditMode}>{isEditMode ? 'View' : 'Edit'}</button>
      </div>

      <div className="content">
      {file.type === 'application/pdf' && (
  <iframe
    src={`http://localhost:5000/notes/upload/${encodeURIComponent(file.name)}#toolbar=0`}
    title={file.name}
    width="100%"
    height="600px"
    style={{ border: 'none' }}
  />
)}
      </div>

      {isEditMode && (
        <div className="editor-tools">
          {/* Add buttons for pen, highlighter, eraser, etc. */}
          <button>Pen</button>
          <button>Highlighter</button>
          {/* Additional editor controls */}
        </div>
      )}

      <div className="comments-section">
        {/* Comments and other actions */}
      </div>
    </div>
  );
}

export default DocumentEditor;
