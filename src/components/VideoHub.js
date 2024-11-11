import React, { useState } from 'react';
import './VideoHub.css';

function VideoHub() {
  const [searchQuery, setSearchQuery] = useState('');

  // Define a list of videos with various subject-related titles
  const videos = [
    { title: "Math - Calculus Basics", channel: "Math World", views: "1.2M views", date: "1 week ago" },
    { title: "Physics - Laws of Motion", channel: "Physics Pro", views: "3.4M views", date: "2 weeks ago" },
    { title: "Chemistry - Atomic Structure", channel: "Chemistry Lab", views: "900K views", date: "3 days ago" },
    { title: "Biology - Cell Theory", channel: "Bio Central", views: "500K views", date: "5 days ago" },
    { title: "Math - Trigonometry Explained", channel: "Math Zone", views: "1M views", date: "2 months ago" },
    { title: "Chemistry - Chemical Reactions", channel: "Chemistry Lab", views: "1.5M views", date: "1 month ago" },
    { title: "Physics - Thermodynamics", channel: "Physics Pro", views: "2.1M views", date: "3 weeks ago" },
    { title: "Math - Algebra Fundamentals", channel: "Math World", views: "700K views", date: "4 months ago" },
    // Add more video entries as needed
  ];

  // Filter videos based on the search query
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="video-hub">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <div className="video-grid">
        {filteredVideos.map((video, index) => (
          <div key={index} className="video-card">
            <div className="thumbnail"></div>
            <div className="video-info">
              <div className="profile-pic"></div>
              <div className="details">
                <div className="title">{video.title}</div>
                <div className="channel">{video.channel}</div>
                <div className="views-date">{video.views} • {video.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoHub;
