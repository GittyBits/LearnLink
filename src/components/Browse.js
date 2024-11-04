import React, { useState, useEffect, useRef } from 'react';
import './Browse.css';

const documents = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  title: `Title of Document ${i + 1}`,
  tags: ['Reading', 'Engineering', 'Science'],
  likes: 109,
  views: 57
}));

const App = () => {
  const scrollRef = useRef(null);
  
  const scrollSync = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    scrollRef.current.scrollTop = scrollTop;
    scrollRef.current.scrollLeft = scrollLeft;
  };

  return (
    <div className="app">
      <aside className="sidebar">
        
        <input type="text" placeholder="Search" className="search-input" />
              </aside>
      
      <div className="content" onScroll={scrollSync} ref={scrollRef}>
        {documents.map(doc => (
          <div key={doc.id} className="document-card">
            <div className="thumbnail"></div>
            <div className="doc-info">
              <h3>{doc.title}</h3>
              <div className="meta">
                <p>{doc.likes} ❤️ | {doc.views} 👀</p>
                {doc.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="actions">
                <a href="#editor" className="link">Open in editor</a>
                <a href="#view" className="link">View</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
