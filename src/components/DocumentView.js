import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DocumentView.css';

function DocumentView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { file: initialFile, description, userId } = location.state || {}; // Get userId from location state

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [file, setFile] = useState(initialFile);
  const [newFile, setNewFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already liked or starred the document
    axios.get(`http://localhost:5050/notes/${file._id}/status`, { params: { userId } })
      .then((response) => {
        const { liked, starred } = response.data;
        setLikes(liked ? 1 : 0);
        setStarred(starred);
      })
      .catch(err => console.error('Error checking status:', err));
  }, [file._id, userId]);

  const handleLike = () => {
    axios.post(`http://localhost:5050/notes/${file._id}/rate`, { likes: likes === 1 ? 0 : 1, stars: starred ? 1 : 0, userId })
      .then(() => {
        setLikes(likes === 1 ? 0 : 1);
      })
      .catch(err => console.error('Error liking document:', err));
  };

  const handleStar = () => {
    axios.post(`http://localhost:5050/notes/${file._id}/rate`, { likes, stars: starred ? 0 : 1, userId })
      .then(() => {
        setStarred(!starred);
      })
      .catch(err => console.error('Error starring document:', err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const handleReply = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  const handleCommentLike = (index) => {
    setCommentLikes((prevLikes) => ({
      ...prevLikes,
      [index]: prevLikes[index] ? 0 : 1,
    }));
  };

  const handleEdit = () => {
    navigate('/editor', { state: { file, description } });
  };

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
