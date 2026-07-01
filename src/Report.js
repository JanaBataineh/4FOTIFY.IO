import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// تأكدي من استيراد مصفوفة الأسئلة هنا (يمكنك فصلها في ملف منفصل أو نسخها)
// import { mockQuestions } from './data'; 

function Report() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // جلب بيانات آخر استبيان تم حفظه
    const savedData = JSON.parse(localStorage.getItem('trustSurveyData')) || [];
    if (savedData.length > 0) {
      setReportData(savedData[0]); // أول عنصر هو أحدث استبيان
    }
  }, []);

  if (!reportData) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading report...</div>;
  }

  const { score, customPartnerNames, answers, name, org, date } = reportData;

  // دالة تحميل الـ PDF باستخدام نافذة الطباعة
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="report-page" style={{ padding: '40px', color: '#fff', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* قسم الأزرار (سيتم إخفاؤه عند الطباعة باستخدام CSS) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>← Back to Home</button>
        <button onClick={handleDownloadPDF} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>
          Download as PDF
        </button>
      </div>

      {/* ترويسة التقرير */}
      <div className="report-header" style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #444', paddingBottom: '20px' }}>
        <h1>Trust Gap Analysis - Results Report</h1>
        <p><strong>Name:</strong> {name} | <strong>Organisation:</strong> {org} | <strong>Date:</strong> {date}</p>
      </div>

      {/* النتيجة النهائية */}
      <div className="score-section" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2>Overall Trust Score</h2>
        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: score >= 70 ? '#4CAF50' : '#FFC107' }}>
          {score}%
        </div>
      </div>

      {/* تفاصيل الإجابات */}
      <div className="details-section">
        <h3>Your Responses</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '15px', border: '1px solid #555' }}>Question ID</th>
              <th style={{ padding: '15px', border: '1px solid #555' }}>Self</th>
              <th style={{ padding: '15px', border: '1px solid #555' }}>{customPartnerNames.partnerA}</th>
              <th style={{ padding: '15px', border: '1px solid #555' }}>{customPartnerNames.partnerB}</th>
              <th style={{ padding: '15px', border: '1px solid #555' }}>{customPartnerNames.partnerC}</th>
            </tr>
          </thead>
          <tbody>
            {/* الدوران على الإجابات لعرضها */}
            {Object.keys(answers).map((questionId) => (
              <tr key={questionId}>
                <td style={{ padding: '15px', border: '1px solid #555' }}>{questionId}</td>
                <td style={{ padding: '15px', border: '1px solid #555' }}>{answers[questionId]?.self || 'N/A'}</td>
                <td style={{ padding: '15px', border: '1px solid #555' }}>{answers[questionId]?.partnerA || 'N/A'}</td>
                <td style={{ padding: '15px', border: '1px solid #555' }}>{answers[questionId]?.partnerB || 'N/A'}</td>
                <td style={{ padding: '15px', border: '1px solid #555' }}>{answers[questionId]?.partnerC || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Report;