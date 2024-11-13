import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/'); // Redirect to homepage or SignIn page
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default SignOut;
