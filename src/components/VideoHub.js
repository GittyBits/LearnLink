import React from 'react';
import './VideoHub.css';

function VideoHub() {
  const videos = Array(8).fill({
    title: "-------------------",
    channel: "XYZ",
    views: "1.5M views",
    date: "2 days ago",
  });

  return (
    <div className="video-hub">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-button">Search</button>
        <button className="icon-button"><i className="fa fa-microphone" /></button>
      </div>
      <div className="video-grid">
        {videos.map((video, index) => (
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
