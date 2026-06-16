import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HowItWorks.css';

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="how-it-works-page">
      {/* زر الرجوع الهادئ */}
      <button className="back-button" onClick={() => navigate('/')}>←</button>

      <section className="how-it-works-content">
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
  );
}

export default HowItWorks;