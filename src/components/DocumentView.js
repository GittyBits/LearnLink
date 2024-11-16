import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DocumentView.css";

function DocumentView() {
  const [file, setFile] = useState(null); // Uploaded file
  const [newFile, setNewFile] = useState(null); // Selected file for upload
  const [comments, setComments] = useState([]); // Comments for the file
  const [newComment, setNewComment] = useState(""); // New comment input
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Comments sidebar state

  // Fetch comments when the selected file changes
  useEffect(() => {
    if (file) {
      fetchComments();
    }
  }, [file]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/comments?filename=${file.filename}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to fetch comments. Please try again.");
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!newFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const response = await axios.post(
        "http://localhost:5050/notes/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Assuming auth token is in localStorage
        }
      );
      setFile(response.data.file);
      setNewFile(null);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Upload a file first to comment.");
      return;
    }

    if (newComment.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:5050/comments",
          { filename: file.filename, comment: newComment },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to post comment. Please try again.");
      }
    }
  };

  // Toggle the comments sidebar
  const toggleSidebar = () => {
    if (!file) {
      alert("Upload a file first to view comments.");
      return;
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="document-view">
      {/* File Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          onChange={(e) => setNewFile(e.target.files[0])}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-btn">
          Select File
        </label>
        {newFile && (
          <button onClick={handleFileUpload} className="upload-btn">
            Upload
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="document-actions">
        <button onClick={toggleSidebar}>
          <i className="fas fa-comment"></i> Comments
        </button>
      </div>

      {/* Comments Sidebar */}
      {isSidebarOpen && (
        <div className="comments-sidebar">
          <div className="comments-section">
            {file && (
              <>
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
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <li key={index}>{comment.text}</li>
                    ))
                  ) : (
                    <p>No comments yet. Be the first to comment!</p>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default DocumentView;
