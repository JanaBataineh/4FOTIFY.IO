import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import img1 from './Navigating-Uncertainty-Together.jpg';
import img2 from './uk-comm-may-24-banner.jpg';
import img3 from './photo-1494412574643-ff11b0a5c1c3.avif';
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
// مرجع جديد لقسم How it works
  const howItWorksRef = useRef(null);

  // دالة النزول السلس لهذا القسم
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ 
      behavior: 'smooth' ,
      block: 'start'
    
    });

  };
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
<button className="btn-primary" onClick={() => navigate('/register')}>
  Register interest in the pilot programme
</button>
<button className="btn-secondary" onClick={scrollToHowItWorks}>
  See how it works
</button>
          </div>

          <p className="hero-footer-note">
            Limited pilot places available · No commitment required to register interest
          </p>
        </div>
      </section>

{/* Scale of the Problem Section */}
<section className="scale-section">
  <div className="container scale-container">
    
    {/* العمود الأيسر: النصوص والعنوان */}
    <div className="scale-content">
      <span className="scale-eyebrow">THE SCALE OF THE PROBLEM</span>
      <h2 className="scale-title">
        Every <br /> 3.7 years.
      </h2>
      <p className="scale-desc">
        On average, organisations face a major supply chain disruption lasting at least a month every 3.7 years, and these events can cost up to 45% of a year's profits.
      </p>
      <span className="scale-source">MCKINSEY GLOBAL INSTITUTE</span>
    </div>

    {/* العمود الأيمن: الكروت (الإحصائيات) */}
    <div className="scale-cards">
      {/* الكرت الأول */}
      <div className="stat-box">
        <h3 className="stat-box-title">45%</h3>
        <p className="stat-box-desc">
          Of one year's profits can be erased by a single major supply chain disruption event.
        </p>
        <span className="stat-box-link">McKinsey Global Institute</span>
      </div>

      {/* الكرت الثاني */}
      <div className="stat-box">
        <h3 className="stat-box-title">Only 30%</h3>
        <p className="stat-box-desc">
          Of senior supply chain leaders have meaningful visibility beyond their Tier 1 suppliers, a figure that has been declining year on year.
        </p>
        <span className="stat-box-link">McKinsey, 2024</span>
      </div>

      {/* الكرت الثالث */}
      <div className="stat-box">
        <h3 className="stat-box-title">100%</h3>
        <p className="stat-box-desc">
          Of suppliers surveyed do not read customer codes of conduct. Sustainability clauses in contracts cannot deliver sustainability nor resilience.
        </p>
        <span className="stat-box-link">EcoVadis, 2023</span>
      </div>
    </div>

  </div>
</section>
{/* Context Section (Zigzag Layout) */}
<section className="context-section">
  
{/* الصف الأول: صورة يسار، نص يمين */}
  <div className="context-row">
    <div className="context-image-col">
      <div className="image-fade-overlay"></div>
      <img src={img1} alt="Cargo Ship Supply Chain" />
    </div>
    <div className="context-text-col">
      <div className="context-text-inner">
        <span className="context-eyebrow">CONTEXT 01 - WHEN CONTRACTS FAIL</span>
        <h2 className="context-title">
          Contractual obligation is not <br />
          <span className="light-blue-italic">the same as genuine partnership.</span>
        </h2>
        <p className="context-desc">
          When COVID-19 hit, brands cancelled orders overnight, citing force majeure clauses, leaving over one million garment factory workers unpaid. Scorecards did not predict it. Audits did not prevent it. The relationships were built on contractual obligation rather than genuine partnership, and when conditions changed, the obligations were set aside. Research on these supply chains identified power dominance, lack of transparency, and absence of shared purpose as the root causes of collapse. These are relational failures, not operational ones.
        </p>
      </div>
    </div>
  </div>

{/* الصف الثاني: نص يسار، صورة يمين */}
  <div className="context-row reverse-row">
    
    {/* 1. كود الصورة حطيناه بالبداية */}
    <div className="context-image-col">
      <div className="image-fade-overlay"></div>
      <img src={img2} alt="Warehouse Operations" />
    </div>

    {/* 2. كود النص حطيناه بعد الصورة */}
    <div className="context-text-col">
      <div className="context-text-inner">
        <span className="context-eyebrow">
          CONTEXT 02 - WHEN TRUST DELIVERS THE IMPOSSIBLE
        </span>
        <h2 className="context-title">
          No contracts. No precedent. <br />
          <span className="light-blue-italic">8,000 people. One shared purpose.</span>
        </h2>
        <p className="context-desc">
          During COVID-19, Rolls-Royce, Airbus, Ford, and McLaren, organisations that ordinarily compete with one another, built a ventilator supply chain from scratch in a matter of weeks. Many of those involved were strangers at the outset. There were no contracts between them. They succeeded because trust was established rapidly, given freely, and honoured throughout. They were the only consortium to succeed. Every other group, despite having the same resources and the same goal, did not. What distinguished them was not capability or process. It was the quality of the relationships they were able to build and sustain under extraordinary pressure.
        </p>
      </div>
    </div>
    
  </div> 


  {/* الصف الثالث: صورة يسار، نص يمين */}
  <div className="context-row">
    <div className="context-image-col">
      <div className="image-fade-overlay"></div>
      <img src={img3} alt="Shipping Port Cargo" />
    </div>
    <div className="context-text-col">
      <div className="context-text-inner">
        <span className="context-eyebrow">CONTEXT 03 - THE GAP CURRENT TOOLS DO NOT FILL</span>
        <h2 className="context-title">
          More data is not <br />
          the answer.
          <span className="light-blue-italic"> Trust is.</span>
        </h2>
        <p className="context-desc">
          Organisations have invested heavily in visibility tools, supplier scorecards, and digital risk platforms. Yet in 2024, only 30% of supply chain leaders had meaningful visibility beyond their Tier 1 suppliers, and that number is declining year on year (McKinsey, 2024). These tools measure what partners do. They do not measure whether the relationship itself will hold when conditions change. 4FOTIFY addresses that gap directly, making trust measurable, profileable, and actionable.
        </p>
      </div>
    </div>
  </div>


</section>

    <div className="how-it-works-page">
      {/* زر الرجوع الهادئ */}
      <button className="back-button" onClick={() => navigate('/')}>←</button>

<section className="how-it-works-content" ref={howItWorksRef}>
          <h5 className="section-eyebrow">HOW IT WORKS</h5>
        <h2 className="main-title">
          A three-step diagnostic that<br />
           surfaces the <span className="highlight">trust-based foundations<br />
             of supply chain sustainability and<br />
              resilience</span> 
        </h2>
        <p className="description">
             The 4FOTIFY diagnostic is built on the Four Factors of Organisational Trust framework,
             developed through research at Cambridge Judge Business School and informed by
             senior supply chain practitioners with between 15 and 45 years of experience. It
             identifies the closest match to one of six trust archetypes and provides a detailed
             picture of how each supplier relationship is likely to behave under both business-as-
             usual and disruption conditions.
        </p>

        <div className="steps-container">
          <div className="step-item">
            <span className="step-number">Step 01</span>
            <h3>Complete the diagnostic</h3>
            <p>
The diagnostic is completed about each
of your key supplier relationships.
Questions are structured around the Four
Factors of Organisational Trust, surfacing
the dynamics of each relationship across
all four dimensions and generating a
scored profile for each supplier.
              </p>
          </div>
          <div className="step-item">
            <span className="step-number">Step 02</span>
            <h3>Identify trust archetypes</h3>
            <p>
Each supplier profile is matched to the
closest of six trust archetypes. This
reveals where hidden fragility exists and
why, which relationships are likely to
come under strain when disruption
arrives, and where there is genuine
strategic strength to build on.
              </p>
          </div>
          <div className="step-item">
            <span className="step-number">Step 03</span>
            <h3>Receive your expert report</h3>
            <p>
A 4FOTIFY analyst delivers a fully
interpreted report combining scored
outputs, archetype profiles, and a
tailored analysis of the trust dynamics at
play. The report identifies where to focus
attention and offers strategic
considerations, drawing on Cambridge-
backed research into the Four Factors of
Organisational Trust.
              </p>
          </div>
        </div>
      </section>
    </div>
{/* --- Outcomes Section (What you leave with) --- */}
<section className="outcomes-section">
  <div className="container">
    
    {/* العنوان والنص الرئيسي (استخدمنا نفس كلاسات القسم السابق) */}
    <span className="section-eyebrow">WHAT YOU LEAVE WITH</span>
    <h2 className="main-title">
      A clear picture of the <span className="highlight">underlying <br />
      trust dynamics across your key <br />
      partnerships.</span>
    </h2>
    <p className="description">
      Every 4FOTIFY engagement produces a set of outputs that give leadership teams a 
      substantive basis for understanding and acting on the relational health of their supply 
      chain.
    </p>

    {/* شبكة الكروت */}
    <div className="outcomes-grid">
      
      {/* الكرت 1 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>A scored profile across all four factors of organisational trust for each supplier relationship assessed</p>
      </div>

      {/* الكرت 2 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>Identification of the closest match to one of six trust archetypes and what that means for sustainability and resilience</p>
      </div>

      {/* الكرت 3 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>A clear picture of where hidden fragility exists across your partnerships and where strain is most likely to emerge under disruption</p>
      </div>

      {/* الكرت 4 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>An expert-interpreted report grounded in Cambridge-backed research into organisational trust</p>
      </div>

      {/* الكرت 5 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>A set of strategic considerations to help your organisation focus attention on the relationships and dimensions that matter most</p>
      </div>

      {/* الكرت 6 */}
      <div className="outcome-card">
        <span className="bullet-dot">•</span>
        <p>A more substantiated basis for sustainability commitments that extends meaningfully beyond Tier 1</p>
      </div>

    </div>
  </div>
</section>
      {/* الـ Footer */}
{/* --- قسم الفوتر مع الشعار الجديد الموحد --- */}
<footer className="footer">
  <div className="container">
    <div className="footer-content">
      
      {/* الشعار الجديد الموحد: تم وضع أيقونة القفل بين 4F و TIFY */}
      <div className="footer-logo">
        4F
        <svg className="lock-icon-footer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M9.5 10.5V8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5V10.5" stroke="currentColor" strokeWidth="1.5"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10.5C6.94772 10.5 6.5 10.9477 6.5 11.5V16.5C6.5 17.0523 6.94772 17.5 7.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5H7.5ZM12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14C13 14.5523 12.5523 15 12 15Z" fill="currentColor"/>
        </svg>
        TIFY
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

