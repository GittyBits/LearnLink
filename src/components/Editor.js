import React, { useState } from 'react';
import './Editor.css';

function Editor() {
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(5);
  const [highlightSize, setHighlightSize] = useState(20);

  return (
    <div className="editor-container">
      {/* Left Sidebar */}
      <div className="editor-sidebar">
        <h1>title</h1>
        <p>@userid</p>
      </div>

      {/* Drawing Canvas */}
      <div className="editor-canvas">
        <canvas id="drawingCanvas" />
      </div>

      {/* Right Sidebar - Tool Options */}
      <div className="editor-tools">
        <div className="tool-icons">
          <button>🔍</button>
          <button>➕</button>
          <button>⬇️</button>
        </div>

        {/* Pen Selector */}
        <label>Pens</label>
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(e.target.value)}
        />

        {/* Eraser */}
        <label>Eraser</label>
        <input
          type="range"
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(e.target.value)}
        />

        {/* Highlighter */}
        <label>Highlighter</label>
        <div
          className="highlighter-preview"
          style={{ backgroundColor: penColor, width: highlightSize, height: highlightSize }}
        />
        <input
          type="range"
          min="10"
          max="50"
          value={highlightSize}
          onChange={(e) => setHighlightSize(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Editor;
