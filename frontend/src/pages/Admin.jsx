import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus
} from 'lucide-react';
import AdminProjects from '../components/AdminProjects';
import AdminCertificates from '../components/AdminCertificates';
import AdminSettings from '../components/AdminSettings';
import '../styles/global.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar glass-card ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="brand">Admin.</h2>
          <button className="mobile-close" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="icon">{tab.icon}</span>
              <span className="label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <p className="email">{user?.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} />
          </button>
          <div className="header-title">
            <h1>{tabs.find(t => t.id === activeTab)?.label} Dashboard</h1>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'certificates' && <AdminCertificates />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-dark);
          color: var(--text-main);
        }
        
        /* Sidebar */
        .admin-sidebar {
          width: 280px;
          height: 100vh;
          border-radius: 0;
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        
        .admin-sidebar.closed {
          transform: translateX(-100%);
          position: absolute;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }

        .sidebar-header .brand {
          font-size: 1.5rem;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .mobile-close {
          display: none;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }

        .nav-item:hover, .nav-item.active {
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary);
        }

        .nav-item.active {
          border-left: 4px solid var(--primary);
        }

        .sidebar-footer {
          margin-top: auto;
          padding: 2rem 1rem 0;
          border-top: 1px solid var(--glass-border);
        }

        .user-info .email {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          word-break: break-all;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition);
        }

        .logout-btn:hover {
          opacity: 0.7;
        }

        /* Main Content */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          overflow-y: auto;
        }

        .admin-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .menu-toggle {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
        }

        .header-title h1 {
          font-size: 1.8rem;
        }

        .dashboard-content {
          animation: fadeIn 0.5s ease-out;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
          }
          .mobile-close {
            display: block;
          }
          .admin-main {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
