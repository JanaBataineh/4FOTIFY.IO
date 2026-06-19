import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬇️ استيراد مكتبة التنقل ⬇️
import './AdminDashboard.css';

// تأكدي من أن صورة الشعار محفوظة باسم logo.png في نفس المجلد
// إذا كنتِ تستخدمين الـ SVG المدمج، تجاهلي هذا السطر
// import logoImg from './logo.png'; 

const mockResults = [
  { 
    id: 1, name: 'Sarah Jenkins', org: 'TechCorp Inc.', sector: 'Technology', score: 85, status: 'Completed', date: '2024-06-15', 
    factors: { f1: 88, f2: 82, f3: 90, f4: 80 },
    recommendations: [
      'Maintain strong transparent communication during limitations.',
      'Anticipate technical needs seamlessly through continued agility.',
      'Foster a culture of open collaboration and knowledge sharing.'
    ]
  },
  { 
    id: 2, name: 'Michael Chen', org: 'Global Logistics', sector: 'Logistics', score: 62, status: 'Completed', date: '2024-06-16', 
    factors: { f1: 70, f2: 60, f3: 65, f4: 53 },
    recommendations: [
      'Focus on increasing transparency during delivery lapses.',
      'Align business priorities more clearly between partners.',
      'Foster active engagement between employees and partners.'
    ]
  },
  { 
    id: 3, name: 'Emma Watson', org: 'TechCorp Inc.', sector: 'Technology', score: 78, status: 'Completed', date: '2024-06-16', 
    factors: { f1: 80, f2: 75, f3: 79, f4: 78 },
    recommendations: [
      'Improve data and evidence sharing practices regularly.',
      'Anticipate technical disruptions more effectively.',
      'Promote ownership of outcomes among team members.'
    ]
  },
  { id: 4, name: 'David Smith', org: 'AeroDynamics', sector: 'Aerospace', score: 45, status: 'In Progress', date: '2024-06-17', factors: null, recommendations: [] },
  { 
    id: 5, name: 'Lisa Kumar', org: 'Global Logistics', sector: 'Logistics', score: 91, status: 'Completed', date: '2024-06-17', 
    factors: { f1: 95, f2: 89, f3: 92, f4: 88 },
    recommendations: [
      'Maintain advanced sustainability standards and innovate.',
      'Anticipate changing requirements seamlessly.',
      'Continue promoting unified long-term strategic vision.'
    ]
  },
];

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); 
  const [allData, setAllData] = useState([]);
  
  // ⬇️ تفعيل دالة التنقل (Navigate) ⬇️
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('trustSurveyData')) || [];
    setAllData([...savedData, ...mockResults]);
  }, []);

  const filteredResults = allData.filter(result => 
    result.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentResults = filteredResults.slice(0, 5);

  const getOrgStats = () => {
    const orgs = {};
    allData.forEach(item => {
      if (!orgs[item.org]) {
        orgs[item.org] = {
          name: item.org,
          sector: item.sector,
          participants: 0,
          totalScore: 0,
          completedCount: 0
        };
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
      row.id,
      `"${row.name}"`, 
      `"${row.org}"`,
      `"${row.sector}"`,
      row.date,
      row.status,
      row.score || 0,
      row.factors?.f1 || 0,
      row.factors?.f2 || 0,
      row.factors?.f3 || 0,
      row.factors?.f4 || 0
    ]);

    const csvContent = [
      headers.join(','), 
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `4FOTIFY_Survey_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ⬇️ دالة تسجيل الخروج ⬇️
  const handleLogout = () => {
    // توجيه المستخدم للصفحة الرئيسية
    navigate('/');
  };

  return (
    <div className="admin-page">
      {/* القائمة الجانبية */}
      <aside className="admin-sidebar">
        
        {/* قسم الشعار والتبويبات (مجمعين بـ div عشان يضلوا فوق) */}
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
            <button 
              className={`nav-item ${activeTab === 'overview' && !selectedUser ? 'active' : ''}`} 
              onClick={() => { setActiveTab('overview'); setSelectedUser(null); setSearchTerm(''); }}
            >
              Dashboard Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'organizations' && !selectedUser ? 'active' : ''}`} 
              onClick={() => { setActiveTab('organizations'); setSelectedUser(null); setSearchTerm(''); }}
            >
              Organizations
            </button>
            <button 
              className={`nav-item ${activeTab === 'responses' && !selectedUser ? 'active' : ''}`} 
              onClick={() => { setActiveTab('responses'); setSelectedUser(null); setSearchTerm(''); }}
            >
              Survey Responses
            </button>
            <button 
              className={`nav-item ${activeTab === 'export' && !selectedUser ? 'active' : ''}`} 
              onClick={() => { setActiveTab('export'); setSelectedUser(null); setSearchTerm(''); }}
            >
              Export Reports
            </button>
          </nav>
        </div>

        {/* ⬇️ زر تسجيل الخروج أسفل القائمة ⬇️ */}
        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>

      </aside>

      {/* المحتوى الرئيسي */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {selectedUser ? 'Detailed Analysis Report' : 
             activeTab === 'organizations' ? 'Registered Organizations' : 
             activeTab === 'responses' ? 'All Survey Responses' :
             activeTab === 'export' ? 'Data Export' :
             'Overview & Results'}
          </h2>
          <div className="admin-user">Admin Profile</div>
        </header>

        {selectedUser ? (
          <div className="report-detail-container">
            <button className="btn-back" onClick={() => setSelectedUser(null)}>
              &larr; Back to {activeTab === 'organizations' ? 'Organizations' : activeTab === 'responses' ? 'Responses' : 'Dashboard'}
            </button>
            
            <div className="report-header-info">
              <div>
                <h1 className="report-participant-name">{selectedUser.name}</h1>
                <p className="report-org-name">{selectedUser.org} | {selectedUser.sector}</p>
              </div>
              <div className={`overall-score-circle large ${selectedUser.score >= 80 ? 'high' : selectedUser.score >= 60 ? 'medium' : 'low'}`}>
                <span className="score-value">{selectedUser.score}%</span>
                <span className="score-label">Overall Trust</span>
              </div>
            </div>

            <h3 className="breakdown-title">Four Factors Breakdown</h3>
            <div className="factors-breakdown-vertical">
              <div className="factor-card-vertical">
                <h4>Factor 01: Technical Competence</h4>
                <div className="factor-card-content">
                  <div className="factor-bar-bg">
                    <div className="factor-bar-fill" style={{ width: `${selectedUser.factors?.f1 || 0}%` }}></div>
                  </div>
                  <div className={`factor-score-circle small ${selectedUser.factors?.f1 >= 80 ? 'high' : selectedUser.factors?.f1 >= 60 ? 'medium' : 'low'}`}>
                    {selectedUser.factors?.f1 || 0}%
                  </div>
                </div>
              </div>

              <div className="factor-card-vertical">
                <h4>Factor 02: Alignment of Purpose</h4>
                <div className="factor-card-content">
                  <div className="factor-bar-bg">
                    <div className="factor-bar-fill" style={{ width: `${selectedUser.factors?.f2 || 0}%` }}></div>
                  </div>
                  <div className={`factor-score-circle small ${selectedUser.factors?.f2 >= 80 ? 'high' : selectedUser.factors?.f2 >= 60 ? 'medium' : 'low'}`}>
                    {selectedUser.factors?.f2 || 0}%
                  </div>
                </div>
              </div>

              <div className="factor-card-vertical">
                <h4>Factor 03: Authentic Leadership</h4>
                <div className="factor-card-content">
                  <div className="factor-bar-bg">
                    <div className="factor-bar-fill" style={{ width: `${selectedUser.factors?.f3 || 0}%` }}></div>
                  </div>
                  <div className={`factor-score-circle small ${selectedUser.factors?.f3 >= 80 ? 'high' : selectedUser.factors?.f3 >= 60 ? 'medium' : 'low'}`}>
                    {selectedUser.factors?.f3 || 0}%
                  </div>
                </div>
              </div>

              <div className="factor-card-vertical">
                <h4>Factor 04: Employee Engagement</h4>
                <div className="factor-card-content">
                  <div className="factor-bar-bg">
                    <div className="factor-bar-fill" style={{ width: `${selectedUser.factors?.f4 || 0}%` }}></div>
                  </div>
                  <div className={`factor-score-circle small ${selectedUser.factors?.f4 >= 80 ? 'high' : selectedUser.factors?.f4 >= 60 ? 'medium' : 'low'}`}>
                    {selectedUser.factors?.f4 || 0}%
                  </div>
                </div>
              </div>
            </div>

            {selectedUser.recommendations && selectedUser.recommendations.length > 0 && (
              <div className="recommendations-section">
                <h3 className="recommendations-title">Recommendations</h3>
                <ul className="recommendations-list">
                  {selectedUser.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
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
            <button 
              onClick={handleExportCSV}
              style={{
                backgroundColor: '#5097a4',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d7a85'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#5097a4'}
            >
              Download CSV Report
            </button>
          </div>
        ) : activeTab === 'organizations' ? (
          <div className="admin-table-container">
            <div className="table-header">
              <h3>Participating Organizations</h3>
              <input 
                type="text" 
                placeholder="Search by organization name..." 
                className="admin-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                        <span className={`score-badge ${org.avgScore >= 80 ? 'high' : org.avgScore >= 60 ? 'medium' : 'low'}`}>
                          {org.avgScore}%
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'responses' ? (
          <div className="admin-table-container">
            <div className="table-header">
              <h3>All Individual Responses</h3>
              <input 
                type="text" 
                placeholder="Search by name or organization..." 
                className="admin-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                {filteredResults.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.org}</td>
                    <td>{row.sector}</td>
                    <td>{row.date}</td>
                    <td>
                      {row.status === 'Completed' ? (
                        <span className={`score-badge ${row.score >= 80 ? 'high' : row.score >= 60 ? 'medium' : 'low'}`}>
                          {row.score}%
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <span className={`status-dot ${row.status === 'Completed' ? 'completed' : 'pending'}`}></span>
                      {row.status}
                    </td>
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
                ))}
              </tbody>
            </table>
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
                      <td>
                        {row.status === 'Completed' ? (
                          <span className={`score-badge ${row.score >= 80 ? 'high' : row.score >= 60 ? 'medium' : 'low'}`}>
                            {row.score}%
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        <span className={`status-dot ${row.status === 'Completed' ? 'completed' : 'pending'}`}></span>
                        {row.status}
                      </td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;