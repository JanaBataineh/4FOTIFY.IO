import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Registerinterest from './Registerinterest';
import './App.css';
import HowItWorks from './HowItWorks'; 

function App() {
  return (
    <Router> 
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Registerinterest />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
}
export default App;