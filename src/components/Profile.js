import React,{useEffect} from 'react';
import './Profile.css';

const Profile = () => {
    useEffect(() => {
        // Hide the TopNav when this component mounts
        const topNav = document.querySelector('.topnav');
        const sideNav = document.querySelector('.sidenav');
        
        if (topNav) topNav.style.display = 'none';  // Hide TopNav
        if (sideNav) sideNav.style.display = 'none';  // Hide SideNav (optional)
        
        // Cleanup function to show the TopNav again when leaving Profile page
        return () => {
          if (topNav) topNav.style.display = 'flex'; // Restore TopNav
          if (sideNav) sideNav.style.display = 'block'; // Restore SideNav
        };
      }, []);
    
return (
<div className="profile-page">
<div className="topnav" style={{ alignItems:'center',alignContent:'center',alignSelf:'center',textAlign:'center',display:'none',height:'0px'}}>
            <div className="brand" onClick={() => window.location.href = "/"}>LearnLink</div>
            </div>
    <div className="profile-sidebar">
    <div className="profile-info">
        <div className="profile-image"></div>
        <h2 className="username">Username</h2>
        <p className="userid">@userid</p>
        <div className="profile-details">
        <p><strong>AGE:</strong> XX</p>
        <p><strong>GENDER:</strong> X</p>
        <p><strong>STATUS:</strong> Student/professional</p>
        <p><strong>EDUCATION:</strong> Computer science</p>
        <p><strong>LOCATION:</strong> India</p>
        <p><strong>LANGUAGES:</strong> English</p>
        </div>
        <div className="profile-quote">
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        </div>
    </div>
    <div className="profile-bio">
        <h3>Bio</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div className="profile-badges">
        <h3>Badges</h3>
        <div className="badges-list">
        <div className="badge">Title</div>
        <div className="badge">Title</div>
        <div className="badge">Title</div>
        <div className="badge">Title</div>
        </div>
    </div>
    </div>

    <div className="uploads-section">
    <h2>Community uploads</h2>
    <p>Total Uploads: 10</p>
    <div className="uploads-grid">
        {Array(10).fill().map((_, index) => (
        <div className="upload-card" key={index}>
            <div className="upload-preview"></div>
            <h4>Title of document</h4>
            <p>Field: Engineering</p>
            <p>Branch: Computer Science</p>
            <div className="tags">
            <span className="tag">Racing</span>
            <span className="tag">Reading</span>
            </div>
            <div className="card-footer">
            <span>1.6k</span> Likes <span>57</span> Views
            </div>
        </div>
        ))}
    </div>
    </div>
</div>
);
};

export default Profile;
