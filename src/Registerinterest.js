import React, { useState } from 'react';
import './Registerinterest.css';
// import MainPage from './MainPage'; // استيراد الصفحة الجديدة هنا
import { useNavigate } from 'react-router-dom'; // 1. استيراد أداة التنقل
function Registerinterest() {
  // حالة نموذج التسجيل
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    organisation: '',
    workEmail: '',
    industrySector: '',
    primaryMotivation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('شكراً لتسجيل اهتمامك. سنتواصل معك خلال 48 ساعة.');
    // يمكنك هنا إرسال البيانات إلى API حقيقي
  };
  const navigate = useNavigate();

  return (
    <div className="register-interest-page">
<button className="back-button" onClick={() => navigate('/')}>
        ← 
      </button>
{/* القسم الرئيسي Hero */}
      <section className="hero">
        <div className="container">
          <div className="quote-mark">"</div>
          <p className="hero-quote">
           Suppliers choose us now. That is the market we are in. They choose who
           to do business with. If they do not trust you, they will not choose you,
           and you will not get their best people, their best innovation, or their best
           effort when you need it most.
          </p>
          <p className="hero-attribution">SENIOR OPERATIONS AND SUPPLY CHAIN EXPERT · 4FOTIFY RESEARCH PARTICIPANT</p>
        </div>
      </section>

      {/* عرض تفاصيل البرنامج التجريبي + نموذج التسجيل */}
      <section className="pilot">
        <div className="container pilot-wrapper">
<div className="pilot-info">
            <h5 className="pilot-subtitle">PILOT PROGRAMME</h5>
            <h2>Register interest in the <br /> <span>4FOTIFY pilot.</span></h2>
            
            <p className="pilot-desc">
              We are offering a small number of organisations the opportunity to experience the full 4FOTIFY diagnostic at a pilot rate, in exchange for structured feedback that will help refine the process before wider launch.
            </p>

            <span className="pilot-badge">Limited pilot places available</span>

            <div className="pilot-includes">
              <h3>THE PILOT INCLUDES</h3>
              <ul>
                <li>Full diagnostic completed across your key supplier relationships</li>
                <li>Trust archetype profiling across up to three supplier relationships</li>
                <li>Expert-interpreted report with tailored strategic considerations</li>
                <li>Debrief session of up to 90 minutes with a 4FOTIFY analyst</li>
                <li>Preferential pilot pricing in exchange for honest feedback</li>
              </ul>
            </div>
          </div>

          <div className="pilot-form">
            <h3>Register your interest</h3>
<form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label>FIRST NAME</label>
                  <input type="text" name="firstName" placeholder="Jane" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>LAST NAME</label>
                  <input type="text" name="lastName" placeholder="Smith" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              
              <div className="input-group">
                <label>JOB TITLE</label>
                <input type="text" name="jobTitle" placeholder="Chief Procurement Officer" value={formData.jobTitle} onChange={handleChange} required />
              </div>
              
              <div className="input-group">
                <label>ORGANISATION</label>
                <input type="text" name="organisation" placeholder="Company name" value={formData.organisation} onChange={handleChange} required />
              </div>
              
              <div className="input-group">
                <label>WORK EMAIL</label>
                <input type="email" name="workEmail" placeholder="you@company.com" value={formData.workEmail} onChange={handleChange} required />
              </div>
              
              <div className="input-group">
                <label>INDUSTRY SECTOR</label>
                <select name="industrySector" value={formData.industrySector} onChange={handleChange} required>
                  <option value="" disabled hidden>Select your sector</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Energy">Energy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* هذا الحقل لن يظهر إلا إذا اختار المستخدم Other */}
  {formData.industrySector === 'Other' && (
    <div className="input-group">
      <label>PLEASE SPECIFY YOUR INDUSTRY</label>
      <input 
        type="text" 
        name="otherIndustry" 
        placeholder="Type your industry here..." 
        value={formData.otherIndustry || ''} 
        onChange={handleChange} 
        required 
      />
    </div>
  )}
{/* تم تحويل هذا الحقل إلى Textarea بناءً على طلب العميلة */}
  <div className="input-group">
    <label>PRIMARY MOTIVATION FOR JOINING</label>
    <textarea 
      name="primaryMotivation" 
      placeholder="Please describe your reason for joining the programme..." 
      value={formData.primaryMotivation} 
      onChange={handleChange} 
      required 
      rows="4"
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'transparent', color: 'inherit', fontFamily: 'inherit' }}
    />
  </div>

              <button type="submit">Register interest in the pilot</button>
            </form>

            <p className="privacy-note">Your details will not be shared with third parties. We will be in touch within 48 hours</p>
          </div>
        </div>
      </section>

{/* الفوتر */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            4F
            <svg className="target-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* الدائرة الخارجية (حرف الـ O) */}
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"/>
              
              {/* قوس القفل من الأعلى */}
              <path d="M9.5 10.5V8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5V10.5" stroke="currentColor" strokeWidth="1.5"/>
              
              {/* جسم القفل من الأسفل مع فتحة القفل الصغيرة */}
              <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10.5C6.94772 10.5 6.5 10.9477 6.5 11.5V16.5C6.5 17.0523 6.94772 17.5 7.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5H7.5ZM12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14C13 14.5523 12.5523 15 12 15Z" fill="currentColor"/>
            </svg>
            TIFY
          </div>
          <div className="footer-text">
            Honourable Mention · CJBS McKinsey Risk Prize 2024 · Cambridge Judge Business School
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Registerinterest;