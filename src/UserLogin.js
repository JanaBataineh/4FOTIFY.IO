import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    // هنا بنعمل محاكاة للرموز (في الواقع بتجي من الباك اند)
    const validTokens = {
      "user1@test.com": "4F-2026",
      "sarah@techcorp.com": "SURVEY-85"
    };

    if (validTokens[email] === token) {
localStorage.setItem('currentUser', JSON.stringify({
  email: email,
  name: " user name", 
  org: "Company Name"   
}));
      navigate('/survey');
    } else {
      alert("Invalid Email or Access Code!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Participant Login</h2>
        <form onSubmit={handleUserLogin}>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Enter Access Code" onChange={(e) => setToken(e.target.value)} required />
          <button type="submit">Access Survey</button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;