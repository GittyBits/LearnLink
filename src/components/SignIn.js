import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignIn.css'; // Import specific styles for SignIn page

const SignIn = () => {
    const navigate = useNavigate(); // Create a navigate instance

    const handleLogin = (event) => {
        event.preventDefault(); 
        navigate('/profile');
    };

    return (
        <div className="container">
            <div className="topnav">
                <div className="brand" onClick={() => window.location.href = "/"}>LearnLink</div>
            </div>
            <div className="profile-img"></div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="login-title">LOG IN</div>
                <input type="text" className="input-field" placeholder="username" required />
                <input type="password" className="input-field" placeholder="password" required />
                
                {/* Enter Button */}
                <button className="enter-btn" type="submit">Enter</button>
            </form>
            <div className="login-link" onClick={() => window.location.href = "/SignUp"}>
                CREATE AN ACCOUNT? Sign Up!
            </div>
        </div>
    );
};

export default SignIn;
