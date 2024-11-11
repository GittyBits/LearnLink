import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DocumentView.css';

function DocumentView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve file and description from location state
  const { file: initialFile, description } = location.state || {};

  // States for likes, comments, starring, and file upload
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [file, setFile] = useState(initialFile);
  const [newFile, setNewFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Prevent PDF refresh when typing in the comment box
  useEffect(() => {
    // Reset any viewer refresh issues
  }, []);

  // Handle liking the document
  const handleLike = () => {
    setLikes((prevLikes) => (prevLikes === 0 ? 1 : 0));
  };

  // Handle starring the document
  const handleStar = () => {
    setStarred(!starred);
  };

  // Handle submitting a comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  // Handle replying to a comment
  const handleReply = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  // Handle liking a comment (toggle like)
  const handleCommentLike = (index) => {
    setCommentLikes((prevLikes) => ({
      ...prevLikes,
      [index]: prevLikes[index] ? 0 : 1,
    }));
  };

  // Handle navigating to the editor with the file
  const handleEdit = () => {
    navigate('/editor', { state: { file, description } });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewFile(selectedFile);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!newFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      // Upload the file to the server
      const response = await axios.post('http://localhost:5050/notes/upload', formData);

      // Update the file state with the uploaded file
      setFile(newFile);
      alert('File uploaded successfully.');
      setNewFile(null);
    } catch (err) {
      alert('File upload failed.');
      console.error('Error uploading file:', err);
    }
  };

  // Toggle the comment sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="document-view">
      {/* Document Header with Edit button aligned to the right */}
      <div className="document-header">
        <h2>{description || 'Untitled Document'}</h2>
        <button className="edit-btn" onClick={handleEdit}>
          <i className="fas fa-edit"></i> Edit
        </button>
      </div>

      {/* Document Display Area */}
      <div className="document-content">
        {file ? (
          <div className="document-placeholder">
            <p>
              File uploaded: {file.name} &nbsp; &nbsp; Type: {file.type} &nbsp;
              &nbsp; Size: {(file.size / 1024).toFixed(2)} KB
            </p>

            {/* Render file based on type */}
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            {file.type === 'application/pdf' && (
              <iframe
                src={URL.createObjectURL(file)}
                title={file.name}
                width="100%"
                height="600px"
              />
            )}
            {/* Add more conditions for other file types if needed */}
          </div>
        ) : (
          <div className="document-placeholder">
            <p>No document available. Please upload a file first.</p>
          </div>
        )}
        <p className="uploaded-by">Uploaded by: User123</p>
      </div>

      {/* Upload from Files Button */}
      <div className="upload-new-file">
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload-input"
        />
        <label htmlFor="file-upload-input" className="upload-btn">
          Upload from Files
        </label>
        {newFile && (
          <button className="upload-btn" onClick={handleFileUpload}>
            Upload File
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="document-actions">
        <button onClick={handleLike}>
          <i className="fas fa-heart"></i> {likes}
        </button>
        <button onClick={toggleSidebar}>
          <i className="fas fa-comment"></i> Comments
        </button>
        <button onClick={handleStar}>
          <i className={`fas fa-star ${starred ? 'starred' : ''}`}></i>
        </button>
        <button>
          <i className="fas fa-download"></i> Download
        </button>
      </div>

      {/* Comments Sidebar */}
      {isSidebarOpen && (
        <div className="comments-sidebar">
          <div className="comments-section">
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button type="submit">Post</button>
            </form>
            <ul className="comments-list">
              {comments.map((comment, index) => (
                <li key={index}>
                  <p>{comment.text}</p>
                  <button onClick={() => handleCommentLike(index)}>
                    <i className="fas fa-heart"></i> {commentLikes[index] || 0}
                  </button>
                  <button onClick={() => handleReply(index, 'Reply text')}>
                    <i className="fas fa-reply"></i> Reply
                  </button>
                  {comment.replies.map((reply, replyIndex) => (
                    <p key={replyIndex} className="reply-text">{reply}</p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentView;
