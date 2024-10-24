import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DocumentView.css';

function DocumentView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve file and description from location state
  const { file, description } = location.state || {};

  // States for likes, comments, and starring
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});

  // Handle liking the document
  const handleLike = () => {
    setLikes(likes + 1);
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

  // Handle liking a comment
  const handleCommentLike = (index) => {
    setCommentLikes({
      ...commentLikes,
      [index]: (commentLikes[index] || 0) + 1,
    });
  };

  // Handle navigating to the editor with the file
  const handleEdit = () => {
    navigate('/editor', { state: { file, description } });
  };

  return (
    <div className="document-view">
      {/* Document Header with Edit button */}
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
            <p>File uploaded: {file.name} &nbsp; &nbsp; &nbsp; Type: {file.type} &nbsp; &nbsp; &nbsp;  Size: {(file.size / 1024).toFixed(2)} KB</p>

            {/* Render file based on type */}
            {file.type.startsWith('image/') && (
              <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100%', height: 'auto' }} />
            )}
            {file.type === 'application/pdf' && (
              <iframe src={URL.createObjectURL(file)} title={file.name} width="100%" height="600px" />
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

      {/* Action Buttons */}
      <div className="document-actions">
        <button onClick={handleLike}>
          <i className="fas fa-heart"></i> {likes}
        </button>
        <button onClick={handleCommentSubmit}>
          <i className="fas fa-comment"></i> Comments
        </button>
        <button onClick={handleStar}>
          <i className={`fas fa-star ${starred ? 'starred' : ''}`}></i>
        </button>
        <button>
          <i className="fas fa-download"></i> Download
        </button>
      </div>

      {/* Comments Section */}
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
              <button>
                <i className="fas fa-reply"></i> Reply
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DocumentView;
