import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DocumentView.css';

function DocumentView() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  
  const { file: initialFile, title } = location.state || { file: null, title: null };
  const [file, setFile] = useState(initialFile);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [username] = useState('User123');  // You may need to fetch this dynamically based on the logged-in user
  const [objectURL, setObjectURL] = useState(null);

  useEffect(() => {
    if (!initialFile) return;

    const fetchFileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/notes/${initialFile._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        });
        setFile(response.data); // Set the full file data from the server
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    if (initialFile._id) {
      fetchFileData(); // Fetch file data using file ID
    }
  }, [initialFile]);

  useEffect(() => {
    if (file?.fileURL) {
      setObjectURL(file.fileURL); // Use fileURL from the backend response
    } else if (file instanceof File) {
      setObjectURL(URL.createObjectURL(file)); // For local file objects
    }
  }, [file]);

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, replies: [], owner: username }]);
      setNewComment('');
    }
  };

  // Handle comment reply submission
  const handleReplySubmit = (index) => {
    if (replyText.trim()) {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[index].replies.push({ text: replyText, owner: username });
        return updatedComments;
      });
      setReplyIndex(null);
      setReplyText('');
    }
  };

  // Handle comment deletion
  const handleDeleteComment = (index) => {
    if (comments[index]?.owner === username) {
      setComments((prevComments) => prevComments.filter((_, i) => i !== index));
    } else {
      alert("You can only delete your own comments.");
    }
  };

  // Handle file upload
  const uploadFile = () => {
    if (newFile) {
      console.log('Uploading file:', newFile);
      // Add actual upload logic here (send newFile to server)
    }
  };

  return (
    <div className="document-view">
      <div className="document-header">
        <h2>Title : {title || 'Untitled Document'}</h2>  {/* Display document title */}
      </div>

      <div className="document-content">
        {file ? (
          <div className="document-placeholder">
            <p>
              File uploaded: {file.originalName || 'N/A'} &nbsp; Type: {file.fileType || 'N/A'} &nbsp; Size: {file.fileSize ? (file.fileSize / 1024).toFixed(2) : 'N/A'} KB
            </p>
            {/* Check if the file type is image or PDF, and display accordingly */}
            {file.fileType?.startsWith('image/') && objectURL && (
              <img src={objectURL} alt={file.originalName} style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }} />
            )}
            {file.fileType === 'application/pdf' && objectURL && (
              <iframe src={objectURL} title={file.originalName} style={{ width: '100%', height: '600px' }} />
            )}
            {/* Add more file types here if needed */}
          </div>
        ) : (
          <div className="document-placeholder">No document available.</div>
        )}
      </div>

      <div className="document-actions">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className="fas fa-comment"></i> Comments
        </button>
        <button onClick={() => setStarred(!starred)}>
          <i className={`fas fa-star ${starred ? 'starred' : ''}`}></i>
        </button>
      </div>

      {/* Comments Sidebar */}
      {isSidebarOpen && (
        <div className="comment-sidebar">
          <div className="comment-sidebar-header">
            <h3>Comments</h3>
            <button onClick={() => setIsSidebarOpen(false)}>Close</button>
          </div>

          <div className="comment-section">
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.owner}: {comment.text}</p>
                  {comment.replies.length > 0 && (
                    <div className="replies">
                      {comment.replies.map((reply, i) => (
                        <p key={i} className="reply">- {reply.owner}: {reply.text}</p>
                      ))}
                    </div>
                  )}
                  {replyIndex === index ? (
                    <div className="reply-form">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <button onClick={() => handleReplySubmit(index)}>Submit Reply</button>
                    </div>
                  ) : (
                    <button onClick={() => setReplyIndex(index)}>Reply</button>
                  )}
                  {comment.owner === username && (
                    <button onClick={() => handleDeleteComment(index)}>Delete</button>
                  )}
                </div>
              ))
            )}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentView;
