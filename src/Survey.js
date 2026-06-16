import React, { useState } from 'react';
import './Survey.css';

// مصفوفة تجريبية للأسئلة (يمكن استبدالها بالكامل لاحقاً)
const mockQuestions = [
  {
    id: 'q1',
    section: 1,
    sectionTitle: 'Factor 01: Information Sharing',
    text: 'How transparently does your primary supplier share operational data during disruptions?',
    options: [
      { text: 'Completely transparent with real-time updates', score: 5 },
      { text: 'Shares data only when explicitly requested', score: 3 },
      { text: 'Rarely shares information or hides critical delays', score: 1 }
    ]
  },
  {
    id: 'q2',
    section: 1,
    sectionTitle: 'Factor 01: Information Sharing',
    text: 'Do you share your long-term demand forecasts with this supplier?',
    options: [
      { text: 'Yes, continuously through shared digital platforms', score: 5 },
      { text: 'Occasionally during quarterly meetings', score: 3 },
      { text: 'No, forecasts are kept internal due to compliance', score: 1 }
    ]
  },
  {
    id: 'q3',
    section: 2,
    sectionTitle: 'Factor 02: Shared Purpose',
    text: 'To what extent do the supplier’s strategic goals align with your company’s sustainability targets?',
    options: [
      { text: 'Perfect alignment, shared KPIs are established', score: 5 },
      { text: 'Moderate alignment, but separate operational focuses', score: 3 },
      { text: 'No alignment, purely transactional contract', score: 1 }
    ]
  }
  // بتقدري تضيفي لحد 30 سؤال بنفس الطريقة تالياً...
];

function Survey() {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});

  // تصفية الأسئلة الخاصة بالقسم الحالي فقط
  const currentQuestions = mockQuestions.filter(q => q.section === currentSection);
  const totalSections = 4;

  // حفظ الإجابة المختارة في الـ State
  const handleOptionSelect = (questionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // التحقق من أن المستخدم أجاب على جميع أسئلة القسم الحالي قبل الانتقال
  const isSectionComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا بتم حساب المجموع وإرساله للـ Backend أو لوحة النتائج
    console.log('Final Answers Collected:', answers);
    alert('Survey submitted! Calculating your results...');
  };

  return (
    <div className="survey-page">
      <div className="survey-container">
        
        {/* شريط التقدم (Progress Bar) */}
        <div className="survey-progress-wrapper">
          <span className="progress-text">Section {currentSection} of {totalSections}</span>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* عنوان القسم الحالي */}
        <h5 className="survey-section-eyebrow">
          {currentQuestions[0]?.sectionTitle || `Section 0${currentSection}`}
        </h5>

        <form onSubmit={handleSubmit} className="survey-form">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="question-block">
              <p className="question-text">
                <span className="question-number">0{index + 1}.</span> {question.text}
              </p>
              
              <div className="options-list">
                {question.options.map((option, optIndex) => (
                  <label 
                    key={optIndex} 
                    className={`option-label ${answers[question.id] === option.score ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.score}
                      checked={answers[question.id] === option.score}
                      onChange={() => handleOptionSelect(question.id, option.score)}
                    />
                    <span className="custom-radio"></span>
                    <span className="option-text">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* أزرار التنقل */}
          <div className="survey-navigation">
            {currentSection > 1 && (
              <button type="button" onClick={prevSection} className="btn-survey-secondary">
                Back
              </button>
            )}
            
            {currentSection < totalSections ? (
              <button 
                type="button" 
                onClick={nextSection} 
                className="btn-survey-primary"
                disabled={!isSectionComplete}
              >
                Next Section
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-survey-submit"
                disabled={!isSectionComplete}
              >
                Submit & View Report
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}

export default Survey;