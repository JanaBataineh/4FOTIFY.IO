import React, { useState } from 'react';
import './Survey.css';
import { useNavigate } from 'react-router-dom';
const mockQuestions = [
  //Question 1
  {
    id: 'q1',
    text: 'Does this partner consistently meet quality and performance expectations?',
    options: [
      { text: 'Rarely meets expectations; frequent failures.', score: 1 },
      { text: 'Meets some expectations but performance is inconsistent.', score: 2 },
      { text: 'Generally reliable with occasional lapses.', score: 3 },
      { text: 'Consistently meets expectations across most areas.', score: 4 },
      { text: 'Exceeds expectations, setting benchmarks.', score: 5 }
    ]
  },
  //Question 2

  {
    id: 'q2',
    text: 'Have there been any recent failures in delivery?',
    options: [
      { text: 'Frequent failures, no corrective actions.', score: 1 },
      { text: 'Regular failures, poor response.', score: 2 },
      { text: 'Occasional failures, generally corrected.', score: 3 },
      { text: 'Rare failures; strong prevention.', score: 4 },
      { text: 'Exceeds expectations, setting benchmarks.', score: 5 }
    ]
  },
    //Question 3
  {
    id: 'q3',
    text: 'Are they transparent about limitations?',
    options: [
      { text: 'No transparency; issues hidden.', score: 1 },
      { text: 'Limited disclosure, usually reactive', score: 2 },
      { text: 'Some transparency but inconsistent.', score: 3 },
      { text: 'Open, proactive in sharing.', score: 4 },
      { text: 'Fully transparent, co-creating solutions.', score: 5 }
    ]
  } ,
      //Question 4
  {
    id: 'q4',
    text: 'How well does the partner adapt technical capabilities to changing requirements or disruptions?',
    options: [
      { text: 'Struggles with change; slow or ineffective responses.', score: 1 },
      { text: 'Adapts only when forced; limited flexibility.', score: 2 },
      { text: 'Adapts moderately; some gaps in response.', score: 3 },
      { text: 'Adapts effectively; minimal disruption.', score: 4 },
      { text: 'Highly agile; anticipates change and adapts seamlessly.', score: 5 }
    ]
  },
  // Question 5
  {
    id: 'q5',
    text: 'Are they equipped to handle sustainability goals?', // [cite: 8]
    options: [
      { text: 'No awareness or capacity.', score: 1 }, // [cite: 8]
      { text: 'Limited capacity; reactive only.', score: 2 }, // [cite: 8]
      { text: 'Basic capacity; can meet minimum goals.', score: 3 }, // [cite: 8]
      { text: 'Strong capacity, sustainability integrated.', score: 4 }, // [cite: 8]
      { text: 'Advanced; innovates and sets standards.', score: 5 } // [cite: 8]
    ]
  },
  // Question 6
  {
    id: 'q6',
    text: 'Do they share data and evidence of performance?', // [cite: 8]
    options: [
      { text: 'No data shared; performance unverifiable.', score: 1 }, // [cite: 8]
      { text: 'Share selective data, often incomplete or unreliable.', score: 2 }, // [cite: 8]
      { text: 'Provide standard performance reports; some sustainability data included.', score: 3 }, // [cite: 8]
      { text: 'Share comprehensive, verified data regularly.', score: 4 }, // [cite: 8]
      { text: 'Real-time access to complete, verified data including sustainability metrics.', score: 5 } // [cite: 8]
    ]
  },

  // Question 7
  {
    id: 'q7',
    text: 'Are business priorities clearly agreed and communicated?', // [cite: 11]
    options: [
      { text: 'Priorities unclear; each party pulls in different directions.', score: 1 }, // [cite: 11]
      { text: 'Some awareness exists, but big gaps renain.', score: 2 }, // [cite: 11]
      { text: 'Partial agreement, but inconsistencies cause friction.', score: 3 }, // [cite: 11]
      { text: 'Priorities well understood and usually aligned.', score: 4 }, // [cite: 11]
      { text: 'Priorities fully aligned and communicated consistently.', score: 5 } // [cite: 11]
    ]
  },
  // Question 8
  {
    id: 'q8',
    text: 'Do partners act with unity during disruptions?', // [cite: 11]
    options: [
      { text: 'Partners compete or withdraw when disruption occurs.', score: 1 }, // [cite: 11]
      { text: 'Coordination is rare and mostly reactive.', score: 2 }, // [cite: 11]
      { text: 'Sometimes align under pressure, not dependable.', score: 3 }, // [cite: 11]
      { text: 'Work together effectively in most disruptions.', score: 4 }, // [cite: 11]
      { text: 'Unified response, jointly managing disruption with ease.', score: 5 } // [cite: 11]
    ]
  },
  // Question 9
  {
    id: 'q9',
    text: 'Are sustainability and resilience goals shared?', // [cite: 11]
    options: [
      { text: 'Goals conflict; no common purpose or link to sustainability..', score: 1 }, // [cite: 11]
      { text: 'Minor overlaps, sustainability rarely a joint focus.', score: 2 }, // [cite: 11]
      { text: 'Some shared goals, sustainability included inconsistently.', score: 3 }, // [cite: 11]
      { text: 'Most goals aligned, sustainability clearly prioritised.', score: 4 }, // [cite: 11]
      { text: 'Shared sustainability purpose drives all joint strategy.', score: 5 } // [cite: 11]
    ]
  },
  // Question 10
  {
    id: 'q10',
    text: 'Are joint initiatives designed around shared values?', // [cite: 14]
    options: [
      { text: 'No joint initiatives or shared efforts exist', score: 1 }, // [cite: 14]
      { text: 'Few initiatives, weak link to values.', score: 2 }, // [cite: 14]
      { text: 'Some initiatives reflect shared values inconsistently.', score: 3 }, // [cite: 14]
      { text: 'Most initiatives values-driven and collaborative.', score: 4 }, // [cite: 14]
      { text: 'All initiatives clearly driven by shared values.', score: 5 } // [cite: 14]
    ]
  },
  // Question 11
  {
    id: 'q11',
    section: 11, // [cite: 13]
    text: 'Is long-term direction aligned across organisations?', // [cite: 14]
    options: [
      { text: 'No long-term vision or direction is shared.', score: 1 }, // [cite: 14]
      { text: 'Visions differ; focus remains short-term.', score: 2 }, // [cite: 14]
      { text: 'Some overlap, but vision is fragmented.', score: 3 }, // [cite: 14]
      { text: 'Clear long-term direction, widely acknowledged.', score: 4 }, // [cite: 14]
      { text: 'Unified long-term vision embedded in strategy.', score: 5 } // [cite: 14]
    ]
  },
  // Question 12
  {
    id: 'q12',
    section: 12, // [cite: 13]
    text: 'Is the purpose of each transaction mutually understood?', // [cite: 14]
    options: [
      { text: 'Each party sees the transaction differently, no common understanding.', score: 1 }, // [cite: 14]
      { text: 'Basic purpose known, but each side interprets it in their own way.', score: 2 }, // [cite: 14]
      { text: 'Sometimes a shared view, but often unclear or disputed.', score: 3 }, // [cite: 14]
      { text: 'Both parties usually agree on the purpose and expected outcome.', score: 4 }, // [cite: 14]
      { text: 'Every transaction starts with a jointly defined purpose that links to wider sustainability and resilience goals.', score: 5 } // [cite: 14]
    ]
  },
  // Question 13
  {
    id: 'q13',
    section: 13, // [cite: 17]
    text: 'Do leaders openly communicate challenges?', // [cite: 16]
    options: [
      { text: 'Challenges hidden; secrecy prevails.', score: 1 }, // [cite: 16]
      { text: 'Only share issues when pressured.', score: 2 }, // [cite: 16]
      { text: 'Sometimes communicate challenges inconsistent.', score: 3 }, // [cite: 16]
      { text: 'Openly communicate in most cases.', score: 4 }, // [cite: 16]
      { text: 'Fully transparent, using candour to build trust.', score: 5 } // [cite: 16]
    ]
  },
  // Question 14
  {
    id: 'q14',
    section: 14, // [cite: 17]
    text: 'Are actions consistent with company values and sustainability commitments?', // [cite: 16]
    options: [
      { text: 'Say one thing, do another; sustainability commitments ignored.', score: 1 }, // [cite: 16]
      { text: 'Actions occasionally reflect values, sustainability secondary.', score: 2 }, // [cite: 16]
      { text: 'Generally aligned, but gaps remain in practice.', score: 3 }, // [cite: 16]
      { text: 'Actions usually match commitments; sustainability evident.', score: 4 }, // [cite: 16]
      { text: 'Fully consistent; sustainability and resilience visibly embedded in all decisions.', score: 5 } // [cite: 16]
    ]
  },
  // Question 15
  {
    id: 'q15',
    section: 15, // [cite: 17]
    text: 'Do leaders take accountability?', // [cite: 16]
    options: [
      { text: 'Deflect blame; avoid responsibility.', score: 1 }, // [cite: 16]
      { text: 'Limited accountability, only when necessary.', score: 2 }, // [cite: 16]
      { text: 'Some accountability but selective.', score: 3 }, // [cite: 16]
      { text: 'Consistently accountable for outcomes.', score: 4 }, // [cite: 16]
      { text: 'Actively seek accountability, foster responsibility culture', score: 5 } // [cite: 16]
    ]
  },
  // Question 16
  {
    id: 'q16',
    section: 16, // [cite: 20]
    text: 'How transparent are leaders in decision-making and communication?', // [cite: 19]
    options: [
      { text: 'Decisions made without explanation.', score: 1 }, // [cite: 19]
      { text: 'Share some information, often after the fact.', score: 2 }, // [cite: 19]
      { text: 'Communicate decisions, but not the reasoning', score: 3 }, // [cite: 19]
      { text: 'Share both decisions and rationale consistently.', score: 4 }, // [cite: 19]
      { text: 'Full clarity; include sustainability and resilience trade-offs in communication.', score: 5 } // [cite: 19]
    ]
  },
  // Question 17
  {
    id: 'q17',
    section: 17, // [cite: 20]
    text: 'Do leaders actively engage with employees, partners, and communities?', // [cite: 19]
    options: [
      { text: 'Rarely engage; inaccessible.', score: 1 }, // [cite: 19]
      { text: 'Engage occasionally, limited visibility.', score: 2 }, // [cite: 19]
      { text: 'Accessible to some stakeholders, not all..', score: 3 }, // [cite: 19]
      { text: 'Consistently engage with employees and partners.', score: 4 }, // [cite: 19]
      { text: 'Highly visible and engaged; embed sustainability and resilience into stakeholder dialogue.', score: 5 } // [cite: 19]
    ]
  },
  // Question 18
  {
    id: 'q18',
    section: 18, // [cite: 20]
    text: 'Do leaders prioritise long-term sustainability and resilience over short-term gains?', // [cite: 19]
    options: [
      { text: 'Focus only on immediate results.', score: 1 }, // [cite: 19]
      { text: 'Occasionally mention long-term goals, actions remain short-term.', score: 2 }, // [cite: 19]
      { text: 'Mix of short-term gains and some long-term thinking.', score: 3 }, // [cite: 19]
      { text: 'Consistently emphasise long-term sustainability and resilience.', score: 4 }, // [cite: 19]
      { text: 'Lead decisively with long-term sustainability and resilience at the core of strategy', score: 5 } // [cite: 19]
    ]
  },
  // Question 19
  {
    id: 'q19',
    section: 19, // [cite: 22]
    text: 'Do employees take ownership of their work?', // [cite: 27]
    options: [
      { text: 'Shift responsibility to others.', score: 1 }, // [cite: 25]
      { text: 'Accept responsibility only when pressured.', score: 2 }, // [cite: 26]
      { text: 'Follow through inconsistently.', score: 3 }, // [cite: 28]
      { text: 'Take responsibility and complete tasks.', score: 4 }, // [cite: 29]
      { text: 'Fully own outcomes and drive improvement.', score: 5 } // [cite: 30]
    ]
  },
  // Question 20
  {
    id: 'q20',
    section: 20, // [cite: 22]
    text: 'Are employees open to feedback and learning?', // [cite: 32, 33, 36]
    options: [
      { text: 'Reject guidance or feedback.', score: 1 }, // [cite: 31]
      { text: 'Listen but rarely act on feedback.', score: 2 }, // [cite: 34, 35]
      { text: 'Take feedback occasionally.', score: 3 }, // [cite: 37]
      { text: 'Consistently apply feedback to improve work.', score: 4 }, // [cite: 38, 39]
      { text: 'Actively seek feedback and learn continuously.', score: 5 } // [cite: 40, 41]
    ]
  },
  // Question 21
  {
    id: 'q21',
    section: 21, // [cite: 22]
    text: 'Do employees\' actions reflect team and organisational values?', // [cite: 44]
    options: [
      { text: 'Actions conflict with values.', score: 1 }, // [cite: 42]
      { text: 'Sometimes follow values.', score: 2 }, // [cite: 43]
      { text: 'Often aligned, with some gaps.', score: 3 }, // [cite: 45, 46]
      { text: 'Actions align with values consistently.', score: 4 }, // [cite: 47]
      { text: 'Always act in line with shared values.', score: 5 } // [cite: 48, 49]
    ]
  },
  // Question 22
  {
    id: 'q22',
    section: 22, // [cite: 55]
    text: 'Do employees show genuine commitment and care in their work?', // [cite: 56]
    options: [
      { text: 'Minimal effort; no care.', score: 1 }, // [cite: 56]
      { text: 'Shows effort inconsistently..', score: 2 }, // [cite: 56]
      { text: 'Usually committed, but occasional lapses.', score: 3 }, // [cite: 56]
      { text: 'Clearly invested and motivated in work.', score: 4 }, // [cite: 56]
      { text: 'Consistently goes above, motivated by shared purpose.', score: 5 } // [cite: 56]
    ]
  },
  // Question 23
  {
    id: 'q23',
    section: 23, // [cite: 55]
    text: 'Do employees speak up about challenges or problems?', // [cite: 56]
    options: [
      { text: 'Keep issues to themselves.', score: 1 }, // [cite: 56]
      { text: 'Only speak up when asked.', score: 2 }, // [cite: 56]
      { text: 'Mention problems. inconsistently.', score: 3 }, // [cite: 56]
      { text: 'Share most challenges. openly.', score: 4 }, // [cite: 56]
      { text: 'Proactively flag issues and suggest solutions.', score: 5 } // [cite: 56]
    ]
  },
  // Question 24
  {
    id: 'q24',
    section: 24, // [cite: 55]
    text: 'Do employees collaborate openly and support others?', // [cite: 56]
    options: [
      { text: 'Work in isolation avoid helping others.', score: 1 }, // [cite: 56]
      { text: 'Occasionally assist when asked.', score: 2 }, // [cite: 56]
      { text: 'Help others inconsistently.', score: 3 }, // [cite: 56]
      { text: 'Actively support colleagues and share knowledge.', score: 4 }, // [cite: 56]
      { text: 'Collaborate proactively and contribute to team success.', score: 5 } // [cite: 56]
    ]
  }

 ];
const partners = ['self', 'partnerA', 'partnerB', 'partnerC'];

function Survey() {
  const navigate = useNavigate();
  // تم حذف formData و isRegistered وكل توابعهم لأنهم لم يعودوا مستخدمين
  const [answers, setAnswers] = useState({});
// 1. حالات لأسماء الشركاء وشاشة البداية
  const [partnerNames, setPartnerNames] = useState({ partnerA: '', partnerB: '', partnerC: '' });
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // 2. دوال التعامل مع إدخال الأسماء
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setPartnerNames(prev => ({ ...prev, [name]: value }));
  };

const handleStartSurvey = async (e) => {
    e.preventDefault();
    
    // جلب بيانات المستخدم المسجل دخول من الـ LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!storedUser || !storedUser.email) {
      alert("Error: Please login first.");
      navigate('/survey-login');
      return;
    }

    try {
      // إرسال أسماء الشركاء للباك إند
      const response = await fetch('http://localhost:5112/api/Interests/update-partners', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storedUser.email,
          partnerA: partnerNames.partnerA,
          partnerB: partnerNames.partnerB,
          partnerC: partnerNames.partnerC
        })
      });

      if (response.ok) {
        // إذا تم الحفظ بنجاح، انتقل لأسئلة الاستبيان
        setIsSetupComplete(true); 
      } else {
        alert("Failed to save partners. Please try again.");
      }
    } catch (error) {
      console.error("Error saving partners:", error);
      alert("Cannot connect to the server.");
    }
  };

  // دالة حفظ التقييم
  const handleOptionSelect = (questionId, partner, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [partner]: score
      }
    }));
  };

  // دالة حفظ الملاحظات
  const handleNoteChange = (questionId, noteText) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        notes: noteText
      }
    }));
  };

  const isComplete = mockQuestions.every(q => 
    partners.every(p =>answers[q.id]?.[p]!== undefined)
  );

  const finalSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('currentUser')) || { name: "Anonymous", org: "N/A",email: "No Email" };

    let totalScore = 0;
    let factorScores = { f1: 0, f2: 0, f3: 0, f4: 0 };
    
    mockQuestions.forEach((q, index) => {
      let score = answers[q.id]?.self || 0;
      score = score === 'N/A' ? 0 : (score || 0);
      totalScore += score;
      if (index < 6) factorScores.f1 += score;
      else if (index < 12) factorScores.f2 += score;
      else if (index < 18) factorScores.f3 += score;
      else factorScores.f4 += score;
    });

    const finalScore = Math.round((totalScore / (24 * 5)) * 100);
    const f1 = Math.round((factorScores.f1 / (6 * 5)) * 100);
    const f2 = Math.round((factorScores.f2 / (6 * 5)) * 100);
    const f3 = Math.round((factorScores.f3 / (6 * 5)) * 100);
    const f4 = Math.round((factorScores.f4 / (6 * 5)) * 100);

    const newSubmission = {
      name: storedUser.name|| "Anonymous", 
      email: storedUser.email,
      org: storedUser.org || "N/A",   
      sector: 'N/A',         
      score: finalScore,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0], 
      factors: { f1, f2, f3, f4 },
      customPartnerNames: partnerNames,
      answers: answers
    };
    try {
      // إرسال البيانات إلى .NET Backend
      const response = await fetch('http://localhost:5112/api/Responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubmission)
      });

      if (response.ok) {
        // 2. حفظ في الـ LocalStorage عشان ملف Report.js يظل شغال ويقرأها للمستخدم
        const existingData = JSON.parse(localStorage.getItem('trustSurveyData')) || [];
        localStorage.setItem('trustSurveyData', JSON.stringify([newSubmission, ...existingData]));
        
        // 3. إنهاء الجلسة والتحويل
        localStorage.setItem('hasCompletedSurvey', 'true');
        // ممكن نترك currentUser إذا كنا بنحتاجه في صفحة التقرير
        
        alert("Thank you for your participation! Your results have been saved.");
        navigate('/'); 
      } else {
        alert("Error saving data to the server.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Cannot connect to the server.");
    }
  };

// إذا لم يكمل المستخدم إدخال الأسماء، اعرض هذه الشاشة أولاً
  if (!isSetupComplete) {
    return (
      <div className="survey-page">
        <div className="survey-container" style={{ maxWidth: '600px', marginTop: '100px' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Identify Your Partners</h2>
          <form onSubmit={handleStartSurvey} className="survey-form">
            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label>PARTNER A NAME <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="partnerA" value={partnerNames.partnerA} onChange={handleNameChange} required style={{ width: '100%', padding: '10px' }}/>
            </div>
            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label>PARTNER B NAME <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="partnerB" value={partnerNames.partnerB} onChange={handleNameChange} required style={{ width: '100%', padding: '10px' }}/>
            </div>
            <div className="input-group" style={{ marginBottom: '40px' }}>
              <label>PARTNER C NAME <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="partnerC" value={partnerNames.partnerC} onChange={handleNameChange} required style={{ width: '100%', padding: '10px' }}/>
            </div>
            <button type="submit" className="btn-survey-submit" style={{ width: '100%', padding: '15px' }}>Start Survey</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="survey-page">
      <div className="survey-container">
        
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
          Trust Gap Analysis Survey
        </h2>

        <form onSubmit={finalSubmit} className="survey-form">
          <div className="section-wrapper" style={{ marginBottom: '60px' }}>
            
            {/* الدوران مباشرة على الأسئلة بدون أقسام */}
            {mockQuestions.map((question, index) => (
              <div key={question.id} className="question-matrix-block">
                <h3 className="question-matrix-title">
                  {/* ترقيم تلقائي من 01 إلى 24 */}
                  <span className="question-number">
                    {index < 9 ? `0${index + 1}` : index + 1}.
                  </span> 
                  {question.text}
                </h3>
                
                <div className="table-responsive">
                  <table className="survey-matrix-table">
                    <thead>
                      <tr>
                        <th className="scale-col">Maturity Scale</th>
                        <th>Self</th>
                        <th>{partnerNames.partnerA}</th>
                        <th>{partnerNames.partnerB}</th>
                        <th>{partnerNames.partnerC}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {question.options.map((option, optIndex) => (
                        <tr key={optIndex}>
                          <td className="scale-text">{option.text}</td>
                          {partners.map(partner => (
                            <td key={partner} className="radio-cell">
                              <input
                                type="radio"
                                name={`${question.id}-${partner}`}
                                value={option.score}
                                checked={answers[question.id]?.[partner] === option.score}
                                onChange={() => handleOptionSelect(question.id, partner, option.score)}
                                required
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="na-row" style={{ borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                        <td className="scale-text" style={{ fontStyle: 'italic', color: '#aaa' }}>N/A (Not Applicable)</td>
                        {partners.map(partner => (
                          <td key={partner} className="radio-cell">
                            <input
                              type="radio"
                              name={`${question.id}-${partner}`}
                              value="N/A"
                              checked={answers[question.id]?.[partner] === 'N/A'}
                              onChange={() => handleOptionSelect(question.id, partner, 'N/A')}
                              required /* <-- جعل السؤال إجبارياً هنا */
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="notes-container">
                  <label>Notes:</label>
                  <textarea 
                    placeholder="Add any specific notes or context here..."
                    value={answers[question.id]?.notes || ''}
                    onChange={(e) => handleNoteChange(question.id, e.target.value)}
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* زر الإرسال الوحيد في نهاية الصفحة */}
          <div className="survey-navigation" style={{ justifyContent: 'center' }}>
            <button 
              type="submit" 
              className="btn-survey-submit"
              disabled={!isComplete}
              style={{ width: '100%', maxWidth: '400px', padding: '15px' }}
            >
              Submit & View Report
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Survey;