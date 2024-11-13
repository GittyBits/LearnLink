import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './SignUp.css'; // Import CSS file for styling

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5050/users/signup', {
        fullName,
        email,
        phone,
        password,
      });
      console.log('User registered:', response.data);
      
      // Navigate to the VideoHub page (you can adjust the route if needed)
      navigate('/signin'); // Use React Router's navigate method
    } catch (err) {
      console.error(err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container" style={{ marginLeft: '25%', display: 'flex', width: '50%', height: 'max-content', padding: '100px 0px', marginTop: '100px' }}>
      <div className="topnav" style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center', textAlign: 'center', display: 'block' }}>
        <div className="brand" onClick={() => navigate("/")}>LearnLink</div> {/* Use navigate() for routing */}
      </div>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="sign-in" onClick={() => navigate('/SignIn')}> {/* Use navigate() for routing */}
        Already have an account? Sign In
      </div>
    </div>
  );
};

export default SignUp;
