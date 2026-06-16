import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
function MainPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    organization: '',
    email: '',
    industrySector: '',
    joinReason: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const formSectionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تقدر تبعت البيانات للـ server أو تخزنها
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // إعادة تعيين النموذج بعد ثانيتين
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        jobTitle: '',
        organization: '',
        email: '',
        industrySector: '',
        joinReason: ''
      });
      setSubmitted(false);
    }, 2000);
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const navigate = useNavigate();

  return (
    <div className="main-page">
      {/* الهيدر - Navbar الرئيسي */}
      <header className="main-header">
        <div className="container header-wrapper">
<div className="logo-text">
  4F<svg className="lock-icon-nav" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M9.5 10.5V8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5V10.5" stroke="currentColor" strokeWidth="1.5"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10.5C6.94772 10.5 6.5 10.9477 6.5 11.5V16.5C6.5 17.0523 6.94772 17.5 7.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5H7.5ZM12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14C13 14.5523 12.5523 15 12 15Z" fill="currentColor"/>
  </svg>TIFY
</div>
          <div className="header-right">
            <span className="badge-nav">CJBS · McKinsey Risk Prize 2024</span>
            <button className="btn-nav" 
            onClick={() => navigate('/register')}
            >Register interest</button>
          </div>
        </div>
      </header>

      {/* الـ Hero الأساسي في أعلى الموقع */}
      <section className="main-hero">
        <div className="container main-hero-content">
          <h5 className="hero-eyebrow">SUPPLY CHAIN · PARTNERSHIP · RESILIENCE</h5>
          <h1 className="hero-main-title">
            Your next disruption is <br />
            <span className="light-blue-italic">already coming.</span>
          </h1>
          <p className="hero-subtitle-question">Will your supplier relationships hold?</p>
          
          <p className="hero-main-desc">
            Most organisations measure what their suppliers do. Very few measure whether the 
            relationship itself will hold when it matters most. 4FOTIFY brings rigour to that 
            question, making the trust dynamics that underpin supply chain partnerships visible, 
            measurable, and actionable.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToForm}>Register interest in the pilot programme</button>
            <button className="btn-secondary" 
            onClick={() => navigate('/how-it-works')}
            >See how it works</button>
          </div>

          <p className="hero-footer-note">
            Limited pilot places available · No commitment required to register interest
          </p>
        </div>
      </section>


      {/* الـ Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="target-icon">⊙</span>
              4FOTIFY
            </div>
            <p className="footer-text">
              Cambridge Venture — CJBS McKinsey Risk Prize 2024 · Cambridge Judge Business School
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;

