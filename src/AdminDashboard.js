import React, { useState } from 'react';
import './AdminDashboard.css';

// بيانات تجريبية (Mock Data)
const mockResults = [
  { id: 1, name: 'Sarah Jenkins', org: 'TechCorp Inc.', sector: 'Technology', score: 85, status: 'Completed', date: '2024-06-15' },
  { id: 2, name: 'Michael Chen', org: 'Global Logistics', sector: 'Logistics', score: 62, status: 'Completed', date: '2024-06-16' },
  { id: 3, name: 'Emma Watson', org: 'TechCorp Inc.', sector: 'Technology', score: 78, status: 'Completed', date: '2024-06-16' },
  { id: 4, name: 'David Smith', org: 'AeroDynamics', sector: 'Aerospace', score: 45, status: 'In Progress', date: '2024-06-17' },
  { id: 5, name: 'Lisa Kumar', org: 'Global Logistics', sector: 'Logistics', score: 91, status: 'Completed', date: '2024-06-17' },
];

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  // دالة فلترة الجدول حسب اسم الشركة أو الشخص
  const filteredResults = mockResults.filter(result => 
    result.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      {/* القائمة الجانبية (Sidebar) */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          4F<span className="lock-icon-admin">🔒</span>TIFY
          <span className="admin-badge">Admin Panel</span>
        </div>
        <nav className="admin-nav">
          <button className="nav-item active">Dashboard Overview</button>
          <button className="nav-item">Organizations</button>
          <button className="nav-item">Survey Responses</button>
          <button className="nav-item">Export Reports</button>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>Overview & Results</h2>
          <div className="admin-user">Admin Profile</div>
        </header>

        {/* كروت الإحصائيات */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <h3>Total Responses</h3>
            <p className="stat-number">124</p>
          </div>
          <div className="stat-card">
            <h3>Organizations</h3>
            <p className="stat-number">18</p>
          </div>
          <div className="stat-card">
            <h3>Avg. Resilience Score</h3>
            <p className="stat-number">72%</p>
          </div>
        </div>

        {/* قسم الجدول */}
        <div className="admin-table-container">
          <div className="table-header">
            <h3>Recent Assessments</h3>
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
                    <button className="btn-view" disabled={row.status !== 'Completed'}>
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;