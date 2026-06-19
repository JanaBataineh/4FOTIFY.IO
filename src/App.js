import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Registerinterest from './Registerinterest';
import './App.css';
import Survey from './Survey';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import ProtectedRoute from './ProtectedRoute'; // استيراد الحارس
function App() {
  return (
    <Router> 
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Registerinterest />} />
        <Route path="/survey" element={<Survey />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />        
        {/* الحماية هنا: لن يدخل أحد للداش بورد إلا إذا كان مسجل دخول */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
export default App;