import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Editor.css';

function Editor() {
    const location = useLocation();
    const { description } = location.state || {};
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [activeTool, setActiveTool] = useState(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penSize, setPenSize] = useState(5);
    const [highlightColor, setHighlightColor] = useState('#ffff00');
    const [highlightSize, setHighlightSize] = useState(20);
    const [scale, setScale] = useState(1);
    const [eraserSize, setEraserSize] = useState(10);
    const [fileData, setFileData] = useState(null);

    // Load the file data onto the canvas as an image
    useEffect(() => {
        if (fileData && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = fileData;
            img.onload = () => {
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
        }
    }, [fileData, scale]);

    // Start drawing
    const startDrawing = (e) => {
        if (!activeTool) return;
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (activeTool === 'pen') {
            ctx.strokeStyle = penColor;
            ctx.lineWidth = penSize;
        } else if (activeTool === 'highlighter') {
            ctx.strokeStyle = highlightColor;
            ctx.lineWidth = highlightSize;
        }
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    // Draw on canvas
    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (activeTool === 'eraser') {
            ctx.clearRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, eraserSize, eraserSize);
        } else {
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.stroke();
        }
    };

    // Stop drawing
    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
    };

    // Clear canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (fileData) {
            const img = new Image();
            img.src = fileData;
            img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    };

    // Zoom in/out
    const zoomIn = () => setScale((prev) => prev + 0.1);
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.1));

    // Download the edited image
    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'edited-image.png';
        link.click();
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setFileData(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="editor-container">
            <div className="editor-sidebar">
                <h1>{description}</h1>
                <p>@userid</p>
                <input type="file" accept="image/*" onChange={handleFileUpload} />
            </div>

            <div className="editor-canvas">
                <canvas
                    ref={canvasRef}
                    width="800"
                    height="600"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>

            <div className="editor-tools">
                <div className="tool-icons">
                    <button onClick={zoomIn} title="Zoom In">🔍+</button>
                    <button onClick={zoomOut} title="Zoom Out">🔍-</button>
                    <button onClick={downloadCanvas} title="Download">⬇️</button>
                </div>

                <h2>Pen</h2>
                <div className="tool-section">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={penSize}
                        onChange={(e) => setPenSize(e.target.value)}
                    />
                    <button
                        className="color-selector"
                        style={{ backgroundColor: penColor }}
                        onClick={() => document.getElementById('penColorPicker').click()}
                    />
                    <input
                        type="color"
                        id="penColorPicker"
                        value={penColor}
                        onChange={(e) => setPenColor(e.target.value)}
                        style={{ display: 'none' }}
                    />
                    <button onClick={() => setActiveTool('pen')} title="Use Pen">✏️</button>
                </div>

                <h2>Highlighter</h2>
                <div className="tool-section">
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={highlightSize}
                        onChange={(e) => setHighlightSize(e.target.value)}
                    />
                    <button
                        className="color-selector"
                        style={{ backgroundColor: highlightColor }}
                        onClick={() => document.getElementById('highlightColorPicker').click()}
                    />
                    <input
                        type="color"
                        id="highlightColorPicker"
                        value={highlightColor}
                        onChange={(e) => setHighlightColor(e.target.value)}
                        style={{ display: 'none' }}
                    />
                    <button onClick={() => setActiveTool('highlighter')} title="Use Highlighter">🖍️</button>
                </div>

                <h2>Eraser</h2>
                <div className="tool-section">
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={eraserSize}
                        onChange={(e) => setEraserSize(e.target.value)}
                    />
                    <button onClick={() => setActiveTool('eraser')} title="Eraser">🧽</button>
                    <button onClick={clearCanvas} title="Clear All">🗑️</button>
                </div>
            </div>
        </div>
    );
}

export default Editor;