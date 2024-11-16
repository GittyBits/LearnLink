import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
/*import axios from 'axios';*/
import './DocumentView.css';

function DocumentView() 
{
  const location = useLocation();
  const navigate = useNavigate();

  const { file: initialFile, description } = location.state || {};
  const [file, setFile] = useState(initialFile);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [username] = useState('User123'); // Simulate logged-in user
  const [objectURL, setObjectURL] = useState(null);

  useEffect(() => {
    if (file instanceof File) {
      setObjectURL(URL.createObjectURL(file));
    }

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [file]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, replies: [], owner: username }]);
      setNewComment('');
    }
  };

  const handleReplySubmit = (index) => {
    if (replyText.trim()) {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[index] = {
          ...updatedComments[index],
          replies: [...updatedComments[index].replies, replyText],
        };
        return updatedComments;
      });
      setReplyIndex(null);
      setReplyText('');
    }
  };

  const handleDeleteComment = (index) => {
    if (comments[index]?.owner === username) {
      setComments((prevComments) => prevComments.filter((_, i) => i !== index));
    } else {
      alert("You can only delete your own comments.");
    }
  };

  const uploadFile = () => {
    if (newFile) {
      console.log('Uploading file:', newFile);
      // Add actual upload logic here
    }
  };

  return (
    <div className="document-view">
      <div className="document-header">
        <h2>{description || 'Untitled Document'}</h2>
        <button className="edit-btn" onClick={() => navigate('/editor', { state: { file, description } })}>
          <i className="fas fa-edit"></i> Edit
        </button>
      </div>

      <div className="document-content">
        {file ? (
          <div className="document-placeholder">
            <p>
              File uploaded: {file.name || 'N/A'} &nbsp; Type: {file.type || 'N/A'} &nbsp; Size: {file.size ? (file.size / 1024).toFixed(2) : 'N/A'} KB
            </p>
            {file.type?.startsWith('image/') && objectURL && <img src={objectURL} alt={file.name} />}
            {file.type === 'application/pdf' && objectURL && <iframe src={objectURL} title={file.name} />}
          </div>
        ) : (
          <div className="document-placeholder">No document available.</div>
        )}
        <p className="uploaded-by">Uploaded by: {username}</p>
      </div>

      <div className="upload-new-file">
        <input type="file" onChange={(e) => setNewFile(e.target.files[0])} id="file-upload-input" hidden />
        <label htmlFor="file-upload-input" className="upload-btn">Upload from Files</label>
        {newFile && <button className="upload-btn" onClick={uploadFile}>Upload File</button>}
      </div>

      <div className="document-actions">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className="fas fa-comment"></i> Comments
        </button>
        <button onClick={() => setStarred(!starred)}>
          <i className={`fas fa-star ${starred ? 'starred' : ''}`}></i>
        </button>
      </div>

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
                  <p>{comment.text} <span className="comment-owner">- {comment.owner}</span></p>
                  <button onClick={() => handleDeleteComment(index)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                  {replyIndex === index && (
                    <div className="reply-input">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <button onClick={() => handleReplySubmit(index)}>Post Reply</button>
                    </div>
                  )}
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
