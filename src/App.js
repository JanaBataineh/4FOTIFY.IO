import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Registerinterest from './Registerinterest';
import './App.css';
import Survey from './Survey';
import AdminDashboard from './AdminDashboard';
function App() {
  return (
    <Router> 
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Registerinterest />} />
        <Route path="/survey" element={<Survey />} /> 
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;