import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import html2pdf from 'html2pdf.js';



function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); 
  const [allData, setAllData] = useState([]);
  const [selectedConsensusOrg, setSelectedConsensusOrg] = useState('');
  const [selectedGraphSession, setSelectedGraphSession] = useState('all');

  // الـ State الخاص ببيانات المهتمين (فارغ بالبداية ليتم تعبئته من الـ API)
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [selectedInterestedUser, setSelectedInterestedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeSurveyDetail, setActiveSurveyDetail] = useState(null);
  const [showComparisonView, setShowComparisonView] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // 1. جلب بيانات الاستبيانات من قاعدة البيانات (.NET API)
    const fetchSurveyResponses = async () => {
      try {
        const response = await fetch('http://localhost:5112/api/Responses');
        if (response.ok) {
          const dbData = await response.json();
          
          // إعادة صياغة البيانات لتتطابق مع شكل الجدول والـ Factors
          const mappedData = dbData.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            org: item.org,
            sector: item.sector,
            score: item.score,
            status: item.status,
            date: item.date,
            factors: {
              f1: item.factor1,
              f2: item.factor2,
              f3: item.factor3,
              f4: item.factor4
            },
            // تحويل النصوص القادمة من الداتا بيز إلى أوبجكتس
            customPartnerNames: item.customPartnerNamesJson ? JSON.parse(item.customPartnerNamesJson) : {},
            answers: item.answersJson ? JSON.parse(item.answersJson) : {}
          }));

          setAllData(mappedData); 
        }
      } catch (error) {
        console.error('Error fetching survey responses:', error);
        // في حال فشل الاتصال بالسيرفر، نجلب من الـ LocalStorage كخطة بديلة
        const savedData = JSON.parse(localStorage.getItem('trustSurveyData')) || [];
        setAllData(savedData);
      }
    };

    // 2. جلب بيانات المهتمين
    const fetchInterestedUsers = async () => {
      try {
        const response = await fetch('http://localhost:5112/api/Interests');
        if (response.ok) {
          const data = await response.json();
          setInterestedUsers(data);
        }
      } catch (error) {
        console.error('Error fetching interested users:', error);
      }
    };

    fetchSurveyResponses();
    fetchInterestedUsers();
  }, []);

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-report-area'); 
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `4FOTIFY_Admin_Report_${activeTab}_${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const filteredResults = allData.filter(result => 
    result.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const employeesInSelectedOrg = allData.filter(d => d.org === selectedConsensusOrg);

const handleSendEmail = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5112/api/Interests/${userId}/send-survey`, {
      method: 'POST'
    });

    if (response.ok) {
      alert("The survey code and password have been successfully sent for the customized survey!");
      
      // التعديل السحري: تحديث حالة المستخدم في الجدول فوراً بدون Refresh
      setInterestedUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, emailStatus: 'Sent' } : user
        )
      );

    } else {
      alert("Failed to send the email. Please check the server Terminal.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Cannot connect to the server.");
  }
};

  const filteredInterestedUsers = interestedUsers.filter(user => 
    (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const recentResults = filteredResults.slice(0, 5);

  const getOrgStats = () => {
    const orgs = {};
    allData.forEach(item => {
      if (!orgs[item.org]) {
        orgs[item.org] = { name: item.org, sector: item.sector, participants: 0, totalScore: 0, completedCount: 0 };
      }
      orgs[item.org].participants += 1;
      
      if (item.status === 'Completed') {
        orgs[item.org].totalScore += item.score;
        orgs[item.org].completedCount += 1;
      }
    });

    return Object.values(orgs).map(org => ({
      ...org,
      avgScore: org.completedCount > 0 ? Math.round(org.totalScore / org.completedCount) : 0
    }));
  };

  const orgStatsList = getOrgStats().filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Participant Name', 'Organization', 'Sector', 'Date', 
      'Status', 'Overall Score', 'Factor 1: Technical', 
      'Factor 2: Alignment', 'Factor 3: Leadership', 'Factor 4: Engagement'
    ];

    const rows = allData.map(row => [
      row.id, `"${row.name}"`, `"${row.org}"`, `"${row.sector}"`, row.date, row.status,
      row.score || 0, row.factors?.f1 || 0, row.factors?.f2 || 0, row.factors?.f3 || 0, row.factors?.f4 || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `4FOTIFY_Survey_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getCompletedCountByEmail = (email) => {
    if (!email) return 0;
    return allData.filter(item => item.email?.toLowerCase() === email.toLowerCase() && item.status === 'Completed').length;
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <div className="admin-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: '700', letterSpacing: '2px', color: '#fff', marginBottom: '8px' }}>
              4F
              <svg style={{ width: '24px', height: '24px', color: '#5097a4', margin: '0 4px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M9.5 10.5V8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5V10.5" stroke="currentColor" strokeWidth="1.5"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10.5C6.94772 10.5 6.5 10.9477 6.5 11.5V16.5C6.5 17.0523 6.94772 17.5 7.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5H7.5ZM12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14C13 14.5523 12.5523 15 12 15Z" fill="currentColor"/>
              </svg>
              TIFY
            </div>
            <span className="admin-badge">Admin Panel</span>
          </div>

          <nav className="admin-nav">
            <button className={`nav-item ${activeTab === 'overview' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setSelectedUser(null); setSearchTerm(''); }}>Dashboard Overview</button>
            <button className={`nav-item ${activeTab === 'organizations' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('organizations'); setSelectedUser(null); setSearchTerm(''); }}>Organizations</button>
            <button className={`nav-item ${activeTab === 'interested' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('interested'); setSelectedUser(null); setSearchTerm(''); }}>Interested Users</button>
            <button className={`nav-item ${activeTab === 'consensus' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('consensus'); setSelectedUser(null); setSearchTerm(''); }}>Consensus Reports</button>
            <button className={`nav-item ${activeTab === 'responses' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('responses'); setSelectedUser(null); setSearchTerm(''); }}>Survey Responses</button>
            <button className={`nav-item ${activeTab === 'export' && !selectedUser ? 'active' : ''}`} onClick={() => { setActiveTab('export'); setSelectedUser(null); setSearchTerm(''); }}>Export Reports</button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {selectedUser ? 'Detailed Analysis Report' : 
             activeTab === 'organizations' ? 'Registered Organizations' : 
             activeTab === 'interested' ? 'Interested Users Details' :
             activeTab === 'consensus' ? 'Consensus Reports' :
             activeTab === 'responses' ? 'All Survey Responses' :
             activeTab === 'export' ? 'Data Export' :
             'Overview & Results'}
          </h2>
          <div className="admin-user">Admin Profile</div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={handleDownloadPDF} style={{ backgroundColor: '#5097a4', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              📥 Download Full PDF Report
            </button>
          </div>
        </header>

        <div id="pdf-report-area" style={{ width: '100%' }}>
          {selectedUser ? (
            <div className="report-detail-container">
              <button className="btn-back" onClick={() => setSelectedUser(null)}>
                &larr; Back to {activeTab === 'organizations' ? 'Organizations' : activeTab === 'responses' ? 'Responses' : 'Dashboard'}
              </button>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>Cross-Participant Comparison Matrix</h3>
                {filteredResults.map((user) => (
                  <div key={user.id} style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #334155', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '20px' }}>
                      <div>
                        <h2 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.6rem' }}>{user.name}</h2>
                        <h4 style={{ color: '#5097a4', margin: '0 0 15px 0' }}>{user.org}</h4>
                        <div style={{ marginTop: '10px' }}>
                          <strong style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Partners:</strong>
                          {user.partners ? (
                            <ul style={{ color: '#94a3b8', margin: '5px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                              {user.partners.split('/').map((partner, idx) => (
                                <li key={idx}>{partner.trim()}</li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '5px 0 0 0' }}>No partners registered</p>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Email: <span style={{ color: '#cbd5e1' }}>{user.email}</span></p>
                        <span style={{ backgroundColor: '#0f172a', padding: '6px 16px', borderRadius: '20px', border: '1px solid #4CAF50', fontWeight: 'bold', color: '#4CAF50', fontSize: '0.85rem' }}>
                          {getCompletedCountByEmail(user.email)} Completed Surveys
                        </span>
                      </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="results-table" style={{ width: '100%', margin: 0 }}>
                        <thead>
                          <tr style={{ backgroundColor: '#0f172a' }}>
        <th>Company</th>
        <th>Partners</th>
        <th>Email Address</th>
        <th>Job Title</th>
        <th>Sector / Field</th>
        <th>Actions</th>
                          </tr>
                        </thead>
<tbody>
      {filteredResults.map((row) => {
        // استخراج أسماء الشركاء وتجاهل القيم الفارغة
        const partnersArray = row.customPartnerNames 
          ? [row.customPartnerNames.partnerA, row.customPartnerNames.partnerB, row.customPartnerNames.partnerC].filter(Boolean)
          : [];
        const partnersDisplay = partnersArray.length > 0 ? partnersArray.join(' / ') : 'No partners';

        return (
          <tr key={row.id}>
            <td style={{ fontWeight: 'bold', color: '#fff' }}>{row.name}</td>
            <td>{row.org}</td>
            <td style={{ color: '#5097a4', fontSize: '0.9rem' }}>{partnersDisplay}</td>
            <td style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{row.email || '—'}</td>
            {/* تأكدي من أن حقل الوظيفة (jobTitle) مضاف إلى قاعدة البيانات والـ API ليتم عرضه هنا */}
            <td>{row.jobTitle || '—'}</td> 
            <td>{row.sector}</td>
            <td>
              <button 
                className="btn-view" 
                disabled={row.status !== 'Completed'} 
                onClick={() => setSelectedUser(row)}
              >
                View Report
              </button>
            </td>
          </tr>
        );
      })}
      
      {filteredResults.length === 0 && (
        <tr>
          <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            No records found.
          </td>
        </tr>
      )}
    </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="charts-main-section" style={{ backgroundColor: 'rgba(255,255,255,0.01)', padding: '25px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ margin: 0, color: '#fff' }}>Detailed Metrics & Survey Analytics</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Change Displayed Survey Data:</label>
                    <select 
                      value={selectedGraphSession} 
                      onChange={(e) => setSelectedGraphSession(e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #444' }}
                    >
                      <option value="all">All Survey Sessions (Combined)</option>
                      <option value="session1">Initial Survey Session (Session 1)</option>
                      <option value="session2">Mid-Term Evaluation Session (Session 2)</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                  <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <h5 style={{ color: '#5097a4', marginTop: 0, marginBottom: '15px' }}>Average Four Factors Metrics Breakdown</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>Technical Competence (Factor 1): <strong style={{ color: '#4CAF50' }}>82%</strong></div>
                      <div>Alignment of Purpose (Factor 2): <strong style={{ color: '#5097a4' }}>75%</strong></div>
                      <div>Authentic Leadership (Factor 3): <strong style={{ color: '#FFC107' }}>69%</strong></div>
                      <div>Employee Engagement (Factor 4): <strong style={{ color: '#F44336' }}>85%</strong></div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <h5 style={{ color: '#5097a4', marginTop: 0, marginBottom: '15px' }}>Survey Option Selection Frequency Counter</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, i) => (
                        <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '80px', fontSize: '0.8rem', color: '#cbd5e1' }}>{opt}:</span>
                          <div style={{ flex: 1, backgroundColor: '#1e293b', height: '12px', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${i === 0 ? 45 : i === 1 ? 30 : i === 2 ? 15 : 10}%`, backgroundColor: '#5097a4', height: '100%' }}></div>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#fff', width: '40px', textAlign: 'left' }}>{i === 0 ? '45%' : i === 1 ? '30%' : i === 2 ? '15%' : '10%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ai-future-integration" style={{ background: 'linear-gradient(90deg, rgba(80,151,164,0.15) 0%, rgba(15,23,42,0.6) 100%)', padding: '20px', borderRadius: '8px', border: '1px dashed #5097a4', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ fontSize: '1.8rem' }}>🤖</div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#5097a4' }}>Future AI Analytics Capabilities (Upcoming Feature)</h4>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    Future AI features will automatically compare previous results and build deep analytics profiles, significantly saving time when studying and validating diagnostic records.
                  </p>
                </div>
              </div>

              {selectedUser.recommendations && selectedUser.recommendations.length > 0 && (
                <div className="recommendations-section" style={{ marginTop: '30px' }}>
                  <h3 className="recommendations-title">Recommendations</h3>
                  <ul className="recommendations-list">
                    {selectedUser.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : activeTab === 'interested' ? (
            <div className="admin-table-container">
              <div className="table-header">
                <h3>People Interested in 4FOTIFY</h3>
                <input 
                  type="text" 
                  placeholder="Search by name or company..." 
                  className="admin-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <table className="results-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Email Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterestedUsers.map((user) => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 'bold', color: '#fff' }}>{user.firstName} {user.lastName}</td>
                      <td>{user.jobTitle}</td>
                      <td>{user.company}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span 
                            style={{
                              width: '10px', height: '10px', borderRadius: '50%',
                              backgroundColor: user.emailStatus === 'Sent' ? '#4CAF50' : '#F44336'
                            }}
                          ></span>
                          <span style={{ color: user.emailStatus === 'Sent' ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>
                            {user.emailStatus}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            className="btn-view"
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }} 
                            onClick={() => { setSelectedInterestedUser(user); setShowModal(true); }}
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => handleSendEmail(user.id)}
                            disabled={user.emailStatus === 'Sent'}
                            style={{ 
                              backgroundColor: user.emailStatus === 'Sent' ? 'transparent' : '#5097a4',
                              color: user.emailStatus === 'Sent' ? '#555' : '#fff',
                              border: user.emailStatus === 'Sent' ? '1px solid #444' : 'none',
                              padding: '6px 12px', 
                              fontSize: '0.85rem',
                              borderRadius: '4px',
                              cursor: user.emailStatus === 'Sent' ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {user.emailStatus === 'Sent' ? 'Email Sent ✓' : 'Send Email'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* شاشة التفاصيل المنبثقة (Modal) */}
              {showModal && selectedInterestedUser && (
                <div style={{ 
                  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                  backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 
                }}>
                  <div style={{ 
                    backgroundColor: '#1e293b', padding: '30px', borderRadius: '10px', width: '500px', 
                    maxWidth: '90%', color: '#fff', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' 
                  }}>
                    <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
                    
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px', color: '#5097a4' }}>
                      Interested User Details
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '15px', fontSize: '0.95rem' }}>
                      <div><strong style={{ color: '#94a3b8' }}>Full Name:</strong> <span style={{ marginLeft: '10px' }}>{selectedInterestedUser.firstName} {selectedInterestedUser.lastName}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Job Title:</strong> <span style={{ marginLeft: '10px' }}>{selectedInterestedUser.jobTitle}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Company:</strong> <span style={{ marginLeft: '10px' }}>{selectedInterestedUser.company}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Industry Sector:</strong> <span style={{ marginLeft: '10px' }}>{selectedInterestedUser.industrySector}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Email Address:</strong> <span style={{ marginLeft: '10px' }}>{selectedInterestedUser.workEmail}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Registration Date:</strong> <span style={{ marginLeft: '10px' }}>{new Date(selectedInterestedUser.createdAt).toLocaleDateString()}</span></div>
                      
                      <div style={{ marginTop: '10px' }}>
                        <strong style={{ color: '#94a3b8' }}>Primary Motivation:</strong>
                        <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '8px', minHeight: '60px', color: '#cbd5e1', border: '1px solid #334155' }}>
                          {selectedInterestedUser.primaryMotivation || 'No additional notes provided.'}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button 
                        onClick={() => setShowModal(false)}
                        style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #5097a4', color: '#5097a4', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'export' ? (
            <div className="admin-table-container" style={{ textAlign: 'center', padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#fff' }}>Export Data to Spreadsheet</h3>
              <p style={{ color: '#94a3b8', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
                Download a complete record of all survey responses. The exported CSV file will include participant details, overall scores, and the breakdown for all four trust factors.
              </p>
              <button onClick={handleExportCSV} style={{ backgroundColor: '#5097a4', color: '#fff', border: 'none', padding: '14px 32px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Download CSV Report
              </button>
            </div>
          ) : activeTab === 'organizations' ? (
            <div className="admin-table-container">
              <div className="table-header">
                <h3>Participating Organizations</h3>
                <input type="text" placeholder="Search by organization name..." className="admin-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Organization Name</th>
                    <th>Industry Sector</th>
                    <th>Total Participants</th>
                    <th>Completed Assessments</th>
                    <th>Average Score</th>
                  </tr>
                </thead>
                <tbody>
                  {orgStatsList.map((org, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 'bold', color: '#fff' }}>{org.name}</td>
                      <td>{org.sector}</td>
                      <td>{org.participants} Members</td>
                      <td>{org.completedCount} / {org.participants}</td>
                      <td>
                        {org.completedCount > 0 ? (
                          <span className={`score-badge ${org.avgScore >= 80 ? 'high' : org.avgScore >= 60 ? 'medium' : 'low'}`}>{org.avgScore}%</span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'consensus' ? (
            <div className="consensus-tab-container">
              <div style={{ backgroundColor: '#1e293b', padding: '15px 20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ color: '#cbd5e1', fontWeight: '600' }}>Select Organization for Internal Consensus Assessment:</label>
                <select value={selectedConsensusOrg} onChange={(e) => setSelectedConsensusOrg(e.target.value)} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #444', width: '250px' }}>
                  <option value="" disabled hidden>Choose organization...</option>
                  <option value="TechCorp Inc.">TechCorp Inc.</option>
                  <option value="Global Logistics">Global Logistics</option>
                  <option value="AeroDynamics">AeroDynamics</option>
                </select>
              </div>
              <div className="consensus-top-comparisons" style={{ backgroundColor: 'rgba(80, 151, 164, 0.04)', padding: '25px', borderRadius: '8px', border: '1px solid rgba(80, 151, 164, 0.15)', marginBottom: '30px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#5097a4' }}>📊 Internal Trust Distribution Metrics</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>Detailed internal data comparisons displaying convergence or variance insights between employees within the same organization to generate unified consensus profiles.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Consensus Discrepancy Margin</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4CAF50', marginTop: '6px' }}>Very Low (±4%)</div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Highest Alignment Factor</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#5097a4', marginTop: '6px' }}>Factor 01: Technical Competence</div>
                  </div>
                  <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Internal Evaluators Progress</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>{employeesInSelectedOrg.filter(e => e.status === 'Completed').length} / {employeesInSelectedOrg.length} Members</div>
                  </div>
                </div>
              </div>
              <div className="admin-table-container">
                <div className="table-header">
                  <h3>Employee Alignment & Survey Matrix</h3>
                </div>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Company Name</th>
                      <th>Assessment Date</th>
                      <th>Individual Score</th>
                      <th>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesInSelectedOrg.map((emp) => (
                      <tr key={emp.id}>
                        <td style={{ fontWeight: 'bold', color: '#fff' }}>{emp.name}</td>
                        <td>{emp.org}</td>
                        <td>{emp.date}</td>
                        <td>{emp.status === 'Completed' ? <strong style={{ color: emp.score >= 70 ? '#4CAF50' : '#FFC107' }}>{emp.score}%</strong> : <span style={{ color: '#64748b' }}>Pending</span>}</td>
                        <td><span className={`status-dot ${emp.status === 'Completed' ? 'completed' : 'pending'}`}></span>{emp.status}</td>
                      </tr>
                    ))}
                    {employeesInSelectedOrg.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>Please select an organization from the dropdown above to display its internal employee metrics and alignment table.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'responses' ? (
            <div className="responses-tab-container">
              <div className="admin-table-container">
                <div className="table-header">
                  <h3>All Individual Responses Records</h3>
                  <input type="text" placeholder="Search by name or company..." className="admin-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email Address</th>
                      <th>Company</th>
                      <th>Sector / Field</th>
                      <th>Date of Last Survey</th>
                      <th>Overall Score</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((row) => (
                      <tr key={row.id}>
                        <td style={{ fontWeight: 'bold', color: '#fff' }}>{row.name}</td>
                        <td style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{row.email || '—'}</td>
                        <td>{row.org}</td>
                        <td>{row.sector}</td>
                        <td>{row.date}</td>
                        <td>{row.status === 'Completed' ? <span className={`score-badge ${row.score >= 80 ? 'high' : row.score >= 60 ? 'medium' : 'low'}`}>{row.score}%</span> : '-'}</td>
                        <td><span className={`status-dot ${row.status === 'Completed' ? 'completed' : 'pending'}`}></span>{row.status}</td>
                        <td><button className="btn-view" disabled={row.status !== 'Completed'} onClick={() => setSelectedUser(row)}>View Report</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="admin-stats-grid">
                <div className="stat-card">
                  <h3>Total Responses</h3>
                  <p className="stat-number">{allData.length}</p> 
                </div>
                <div className="stat-card">
                  <h3>Organizations</h3>
                  <p className="stat-number">{new Set(allData.map(d => d.org)).size}</p>
                </div>
                <div className="stat-card">
                  <h3>Avg. Resilience Score</h3>
                  <p className="stat-number">
                    {Math.round(allData.filter(d => d.status === 'Completed').reduce((acc, curr) => acc + curr.score, 0) / (allData.filter(d => d.status === 'Completed').length || 1))}%
                  </p>
                </div>
              </div>
              <div className="admin-table-container">
                <div className="table-header">
                  <h3>Recent Assessments</h3>
                </div>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Organization</th>
                      <th>Sector</th>
                      <th>Date</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.org}</td>
                        <td>{row.sector}</td>
                        <td>{row.date}</td>
                        <td>{row.status === 'Completed' ? <span className={`score-badge ${row.score >= 80 ? 'high' : row.score >= 60 ? 'medium' : 'low'}`}>{row.score}%</span> : '-'}</td>
                        <td><span className={`status-dot ${row.status === 'Completed' ? 'completed' : 'pending'}`}></span>{row.status}</td>
                        <td><button className="btn-view" disabled={row.status !== 'Completed'} onClick={() => setSelectedUser(row)}>View Report</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;