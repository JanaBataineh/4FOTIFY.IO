import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // إرسال الإيميل والكود للباك إند للتحقق
      const response = await fetch('http://localhost:5112/api/Interests/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, code: token })
      });

      if (response.ok) {
        // إذا الكود صحيح، بنستقبل بيانات المستخدم من السيرفر
        const data = await response.json();
        
        // تخزين البيانات الحقيقية بالـ LocalStorage
        localStorage.setItem('currentUser', JSON.stringify({
          email: email,
          name: data.name, // الاسم الحقيقي من قاعدة البيانات
          org: data.org    // اسم الشركة الحقيقي
        }));
        
        // توجيه المستخدم لصفحة الاستبيان
        navigate('/survey');
      } else {
        // إذا الكود غلط أو الإيميل غلط
        alert("Invalid Email or Access Code! Please check the code sent to your email.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Cannot connect to the server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Participant Login</h2>
        <form onSubmit={handleUserLogin}>
          <input type="email"
           placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
             required 
             />
          <input
           type="text" 
           placeholder="Enter Access Code"
            onChange={(e) => setToken(e.target.value)}
             required 
             />
            <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Access Survey'}
          </button>
          </form>
      </div>
    </div>
  );
}

export default UserLogin;