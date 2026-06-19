import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // رح ننشئ هذا الملف للستايل

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // البيانات اللي بتدخلها العميلة (بتقدري تغيريها)
    const adminEmail = "admin@4fortify.com";
    const adminPass = "4fortify2026";

    if (email === adminEmail && password === adminPass) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin'); // تحويلها للداش بورد
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Access</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;