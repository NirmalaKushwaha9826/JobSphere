import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Bookmark, 
  Bell, 
  FileText, 
  PlusCircle, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Sun, 
  Moon, 
  Search, 
  Users, 
  Sliders, 
  Mail, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';
import { allJobs } from '../jobsData';

export default function Dashboard({ isLightTheme, toggleTheme }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const setActiveTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };
  
  const [localLightTheme, setLocalLightTheme] = useState(() => {
    return document.body.classList.contains('light-theme');
  });

  const isThemeLight = isLightTheme !== undefined ? isLightTheme : localLightTheme;

  const onToggleTheme = () => {
    if (toggleTheme) {
      toggleTheme();
    } else {
      const newStatus = !localLightTheme;
      setLocalLightTheme(newStatus);
      if (newStatus) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    }
  };

  // Load user from localStorage or fall back to demo
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return {
      name: 'Khushi Chaurasiya',
      email: 'khushi@gmail.com',
      role: 'candidate',
      title: 'UI/UX Designer',
      bio: 'Passionate designer building modern web interfaces and exploring opportunities.',
      phone: '+91 98765 43210',
      location: 'Mumbai, MH',
      education: 'Bachelor of Technology (B.Tech)',
      skills: 'React, Javascript, CSS, HTML',
      resumeName: 'Khushi_Chaurasiya_Resume.pdf'
    };
  });

  const isEmployer = user.role?.toLowerCase() === 'employer';

  // Profile Form State
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileTitle, setProfileTitle] = useState(user.title || '');
  const [profileBio, setProfileBio] = useState(user.bio || '');
  const [profilePhone, setProfilePhone] = useState(user.phone || '');
  const [profileLocation, setProfileLocation] = useState(user.location || '');
  const [profileEducation, setProfileEducation] = useState(user.education || '');
  const [profileSkills, setProfileSkills] = useState(user.skills || '');
  const [profileResumeName, setProfileResumeName] = useState(user.resumeName || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Recruiter Job Post Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobRole, setJobRole] = useState('Data Entry');
  const [jobSalary, setJobSalary] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobLogoColor, setJobLogoColor] = useState('#2563eb');
  const [jobDescription, setJobDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Recruiter: Manage Applicants State
  const [applicants, setApplicants] = useState([
    { id: 101, name: 'Rahul Kumar', email: 'rahul@gmail.com', jobTitle: 'Sales Executive', status: 'Waiting' },
    { id: 102, name: 'Neha Sharma', email: 'neha@gmail.com', jobTitle: 'Accountant', status: 'Waiting' },
    { id: 103, name: 'Amit Singh', email: 'amit@gmail.com', jobTitle: 'Driver', status: 'Accepted' },
    { id: 104, name: 'Pooja Patel', email: 'pooja@gmail.com', jobTitle: 'Delivery Boy', status: 'Rejected' }
  ]);

  // Candidate: Applied Jobs State
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { id: 1, title: 'Sales Executive', company: 'AddContact Pvt Ltd', status: 'Waiting', date: '2026-06-08' },
      { id: 2, title: 'Accountant', company: 'ENS Associates', status: 'Accepted', date: '2026-06-05' },
      { id: 3, title: 'Data Entry', company: 'QuickMove', status: 'Interview', date: '2026-06-03' },
      { id: 4, title: 'Sales Executive', company: 'WebTech Pvt Ltd', status: 'Rejected', date: '2026-05-28' }
    ];
  });
  const [appliedSearch, setAppliedSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  // Candidate: Saved Jobs State
  const [savedJobs, setSavedJobs] = useState([
    { id: 3, title: 'Driver', company: 'QuickMove', salary: '₹20,000/month', location: 'Mumbai, MH', jobType: 'Contract', role: 'Driver' },
    { id: 4, title: 'Delivery Boy', company: 'FastDrop', salary: '₹16,000/month', location: 'Delhi, NCR', jobType: 'Part-time', role: 'Delivery' }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your application for Sales Executive has been viewed.', time: '2 hours ago', unread: true },
    { id: 2, text: 'Congratulations! Your profile matches the Accountant opening.', time: '1 day ago', unread: true },
    { id: 3, text: 'Welcome to JobSphere! Complete your profile to get matches.', time: '3 days ago', unread: false }
  ]);

  // Sync user profile changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: profileName,
      email: profileEmail,
      title: profileTitle,
      bio: profileBio,
      phone: profilePhone,
      location: profileLocation,
      education: profileEducation,
      skills: profileSkills,
      resumeName: profileResumeName
    };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Recruiter Job Posting
  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobCompany || !jobSalary || !jobLocation || !jobDescription) {
      alert('Please fill out all fields');
      return;
    }

    const newJob = {
      id: Date.now(),
      title: jobTitle,
      company: jobCompany,
      role: jobRole,
      salary: jobSalary,
      location: jobLocation,
      jobType: jobType,
      logoColor: jobLogoColor,
      logoLetter: jobCompany.trim().charAt(0).toUpperCase() || 'J',
      description: jobDescription
    };

    // Save custom job to localStorage
    const storedCustom = localStorage.getItem('customJobs');
    const customList = storedCustom ? JSON.parse(storedCustom) : [];
    const updatedCustomList = [...customList, newJob];
    localStorage.setItem('customJobs', JSON.stringify(updatedCustomList));

    // Push in-memory so it applies immediately in other components
    allJobs.push(newJob);

    setPostSuccess(true);
    // Reset form
    setJobTitle('');
    setJobCompany('');
    setJobSalary('');
    setJobLocation('');
    setJobDescription('');
    setTimeout(() => setPostSuccess(false), 3000);
  };

  // Manage Applicant Statuses
  const handleApplicantStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  // Unsave Jobs
  const handleUnsaveJob = (id) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  // Apply to Saved Job
  const handleApplySavedJob = (job) => {
    // Add to applied
    const newApplied = {
      id: job.id,
      title: job.title,
      company: job.company,
      status: 'Waiting',
      date: new Date().toISOString().split('T')[0]
    };
    setAppliedJobs(prev => [newApplied, ...prev]);
    // Remove from saved
    handleUnsaveJob(job.id);
  };

  // Notifications operations
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Menu Tabs configurations
  const candidateMenu = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'applied', label: 'Applied Jobs', icon: FileText },
    { id: 'saved', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => n.unread).length }
  ];

  const employerMenu = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Company Profile', icon: User },
    { id: 'recruiter', label: 'Recruiter Tools', icon: Sliders },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => n.unread).length }
  ];

  const currentMenu = isEmployer ? employerMenu : candidateMenu;

  return (
    <div className={`db-container ${isThemeLight ? 'dashboard-light-theme' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className={`db-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div>
          <div className="db-sidebar-header">
            {!isCollapsed && <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-hover)' }}>DASHBOARD PANEL</span>}
            <button 
              className="db-collapse-btn" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav>
            <ul className="db-menu-list">
              {currentMenu.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      className={`db-menu-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {!isCollapsed && item.badge > 0 && (
                        <span style={{ marginLeft: 'auto', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '50px' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer Theme Toggling */}
        <div className="db-sidebar-footer">
          <button 
            className="db-theme-toggle" 
            onClick={onToggleTheme}
            title={isThemeLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isThemeLight ? <Moon size={16} /> : <Sun size={16} />}
            <span>{isThemeLight ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="db-main">
        {/* Toggle Hamburger on small viewports */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <button 
            className="db-hamburger" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Dynamic Sub-Views */}
        {activeTab === 'overview' && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Welcome back, {user.name}!</h2>
                <p className="db-view-subtitle">Here is what is happening with your account today.</p>
              </div>
            </div>

            {/* Analytics Stats Grid */}
            <div className="db-analytics-grid">
              {isEmployer ? (
                <>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#3b82f6', '--icon-bg': 'rgba(59,130,246,0.1)' }}>
                    <div className="db-card-icon-wrapper"><Briefcase size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{allJobs.filter(j => j.company.toLowerCase().includes(user.name.split(' ')[0].toLowerCase()) || j.id > 1000).length + 2}</h4>
                      <span className="db-card-label">Active Job Posts</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#10b981', '--icon-bg': 'rgba(16,185,129,0.1)' }}>
                    <div className="db-card-icon-wrapper"><Users size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{applicants.length}</h4>
                      <span className="db-card-label">Total Applicants</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#8b5cf6', '--icon-bg': 'rgba(139,92,246,0.1)' }}>
                    <div className="db-card-icon-wrapper"><FileCheck size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{applicants.filter(a => a.status === 'Accepted').length}</h4>
                      <span className="db-card-label">Interviews Scheduled</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#f59e0b', '--icon-bg': 'rgba(245,158,11,0.1)' }}>
                    <div className="db-card-icon-wrapper"><AlertCircle size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{applicants.filter(a => a.status === 'Waiting').length}</h4>
                      <span className="db-card-label">Pending Reviews</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#3b82f6', '--icon-bg': 'rgba(59,130,246,0.1)' }}>
                    <div className="db-card-icon-wrapper"><FileText size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{appliedJobs.length}</h4>
                      <span className="db-card-label">Applications Sent</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#10b981', '--icon-bg': 'rgba(16,185,129,0.1)' }}>
                    <div className="db-card-icon-wrapper"><Users size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">124</h4>
                      <span className="db-card-label">Profile Views</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#ec4899', '--icon-bg': 'rgba(236,72,153,0.1)' }}>
                    <div className="db-card-icon-wrapper"><Bookmark size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{savedJobs.length}</h4>
                      <span className="db-card-label">Saved Bookmarks</span>
                    </div>
                  </div>
                  <div className="db-analytics-card" style={{ '--card-theme-color': '#8b5cf6', '--icon-bg': 'rgba(139,92,246,0.1)' }}>
                    <div className="db-card-icon-wrapper"><FileCheck size={22} /></div>
                    <div className="db-card-info">
                      <h4 className="db-card-value">{appliedJobs.filter(j => j.status === 'Interview').length}</h4>
                      <span className="db-card-label">Interview Invites</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Overview Quick card */}
            <div className="db-content-card">
              <h3 className="db-content-card-title"><User size={20} /> Quick Profile Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 20, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.8rem' }}>
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#ffffff' }} className="db-view-title">{user.name}</h4>
                  <p style={{ margin: '0 0 6px 0', color: 'var(--primary-hover)', fontWeight: 600 }}>{user.title || (isEmployer ? 'Recruiting Manager' : 'Candidate')}</p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>{user.bio || 'Click My Profile in the sidebar to add a bio and contact information.'}</p>
                </div>
              </div>
            </div>

            {/* Recent activity summary */}
            <div className="db-content-card">
              <h3 className="db-content-card-title"><Bell size={20} /> Recent Account Activity</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--text-secondary)', paddingBottom: 10, borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓</span>
                  <span>Completed profile setup checklist.</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>1 hour ago</span>
                </li>
                <li style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--text-secondary)', paddingBottom: 10, borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--primary-hover)', fontWeight: 600 }}>ℹ</span>
                  <span>Logged in from a new Chrome session.</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>3 hours ago</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Profile Settings</h2>
                <p className="db-view-subtitle">Edit your contact details and public portfolio display details.</p>
              </div>
            </div>

            <div className="db-content-card">
              <h3 className="db-content-card-title"><User size={20} /> Personal Information</h3>

              {user.role === 'candidate' && !(user.phone && user.location && user.education && user.skills && user.resumeName) && (
                <div className="onboarding-notice-banner" style={{ marginBottom: 24 }}>
                  <span className="notice-icon">💡</span>
                  <div className="notice-body">
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem', marginBottom: 4 }}>Activate One-Click Apply!</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      Complete your Phone, Location, Education, Skills, and upload a Resume below to instantly apply to jobs without filling out forms.
                    </p>
                  </div>
                </div>
              )}
              
              {profileSuccess && (
                <div style={{ color: 'var(--success)', padding: 12, background: 'rgba(16,185,129,0.15)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', marginBottom: 20, fontSize: '0.9rem', fontWeight: 600 }}>
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="db-profile-form">
                <div className="db-form-group">
                  <label>Full Name</label>
                  <input 
                    className="db-form-input" 
                    value={profileName} 
                    onChange={e => setProfileName(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Email Address</label>
                  <input 
                    className="db-form-input" 
                    type="email"
                    value={profileEmail} 
                    onChange={e => setProfileEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Phone Number</label>
                  <input 
                    className="db-form-input" 
                    value={profilePhone} 
                    onChange={e => setProfilePhone(e.target.value)} 
                    placeholder="e.g. +91 98765 43210"
                    required={user.role === 'candidate'}
                  />
                </div>
                <div className="db-form-group">
                  <label>City & State</label>
                  <input 
                    className="db-form-input" 
                    value={profileLocation} 
                    onChange={e => setProfileLocation(e.target.value)} 
                    placeholder="e.g. Mumbai, MH"
                    required={user.role === 'candidate'}
                  />
                </div>
                <div className="db-form-group full-width">
                  <label>Professional Headline</label>
                  <input 
                    className="db-form-input" 
                    value={profileTitle} 
                    onChange={e => setProfileTitle(e.target.value)} 
                    placeholder="e.g. Senior Software Engineer / Hiring Lead"
                  />
                </div>
                <div className="db-form-group full-width">
                  <label>Highest Education</label>
                  <input 
                    className="db-form-input" 
                    value={profileEducation} 
                    onChange={e => setProfileEducation(e.target.value)} 
                    placeholder="e.g. Bachelor of Technology (B.Tech) - IIT Bombay"
                    required={user.role === 'candidate'}
                  />
                </div>
                <div className="db-form-group full-width">
                  <label>Key Skills (Comma Separated)</label>
                  <input 
                    className="db-form-input" 
                    value={profileSkills} 
                    onChange={e => setProfileSkills(e.target.value)} 
                    placeholder="e.g. React, JavaScript, CSS, Node.js"
                    required={user.role === 'candidate'}
                  />
                </div>
                {user.role === 'candidate' && (
                  <div className="db-form-group full-width">
                    <label>Resume File</label>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <input 
                        type="file" 
                        id="profile-resume-upload" 
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={e => {
                          if (e.target.files[0]) {
                            setProfileResumeName(e.target.files[0].name);
                          }
                        }}
                      />
                      <label 
                        htmlFor="profile-resume-upload" 
                        className="db-action-btn secondary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem', margin: 0, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 8, color: '#fff' }}
                      >
                        📁 Choose Resume
                      </label>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {profileResumeName ? `Active File: ${profileResumeName}` : "No resume uploaded yet (required for One-Click Apply)"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="db-form-group full-width">
                  <label>Professional Summary (Bio)</label>
                  <textarea 
                    className="db-form-textarea" 
                    value={profileBio} 
                    onChange={e => setProfileBio(e.target.value)} 
                    placeholder="Tell us about your background, skills, and aspirations..."
                  />
                </div>
                <div className="full-width" style={{ marginTop: 10 }}>
                  <button type="submit" className="db-action-btn primary">Save Profile Settings</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Applied Jobs Tab */}
        {activeTab === 'applied' && !isEmployer && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Applied Jobs</h2>
                <p className="db-view-subtitle">Track the status of your submitted job applications.</p>
              </div>
            </div>

            <div className="db-content-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 15, flexWrap: 'wrap' }}>
                <h3 className="db-content-card-title" style={{ margin: 0 }}><FileText size={20} /> Application Logs</h3>
                <div style={{ position: 'relative', maxWidth: 300, width: '100%' }}>
                  <input 
                    className="db-form-input" 
                    placeholder="Search applications..." 
                    style={{ paddingLeft: 36, paddingRight: 10 }}
                    value={appliedSearch}
                    onChange={e => setAppliedSearch(e.target.value)}
                  />
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                </div>
              </div>

              <div className="db-table-wrapper">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Job Role</th>
                      <th>Company</th>
                      <th>Application Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs.filter(j => 
                      j.title.toLowerCase().includes(appliedSearch.toLowerCase()) || 
                      j.company.toLowerCase().includes(appliedSearch.toLowerCase())
                    ).map(job => (
                      <tr key={job.id}>
                        <td style={{ fontWeight: 600 }}>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.date}</td>
                        <td>
                          <span className={`db-status-tag ${job.status.toLowerCase()}`}>
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Saved Bookmarks Tab */}
        {activeTab === 'saved' && !isEmployer && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Saved Bookmarks</h2>
                <p className="db-view-subtitle">Manage listings you have bookmarked for application.</p>
              </div>
            </div>

            <div className="db-content-card">
              <h3 className="db-content-card-title"><Bookmark size={20} /> Bookmarked Openings</h3>
              {savedJobs.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No jobs saved. Explore jobs to bookmark opportunities!</p>
              ) : (
                <div className="db-table-wrapper">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>Job Opening</th>
                        <th>Location</th>
                        <th>Compensation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedJobs.map(job => (
                        <tr key={job.id}>
                          <td>
                            <div style={{ fontWeight: 600 }}>{job.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{job.company} • {job.jobType}</div>
                          </td>
                          <td>{job.location}</td>
                          <td style={{ color: 'var(--success)', fontWeight: 600 }}>{job.salary}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button 
                                className="db-action-btn primary" 
                                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                onClick={() => handleApplySavedJob(job)}
                              >
                                Apply Now
                              </button>
                              <button 
                                className="db-action-btn danger" 
                                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                onClick={() => handleUnsaveJob(job.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recruiter Tools Tab (Employer only) */}
        {activeTab === 'recruiter' && isEmployer && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Recruiter Hub</h2>
                <p className="db-view-subtitle">Post new job openings and manage candidate applications.</p>
              </div>
            </div>

            {/* Post a Job Form */}
            <div className="db-content-card">
              <h3 className="db-content-card-title"><PlusCircle size={20} /> Post a New Job Listing</h3>
              
              {postSuccess && (
                <div style={{ color: 'var(--success)', padding: 12, background: 'rgba(16,185,129,0.15)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', marginBottom: 20, fontSize: '0.9rem', fontWeight: 600 }}>
                  Job opening posted successfully! View it in Explore Jobs.
                </div>
              )}

              <form onSubmit={handlePostJob} className="db-profile-form">
                <div className="db-form-group">
                  <label>Job Title</label>
                  <input 
                    className="db-form-input" 
                    placeholder="e.g. Front End Engineer" 
                    value={jobTitle} 
                    onChange={e => setJobTitle(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Hiring Company</label>
                  <input 
                    className="db-form-input" 
                    placeholder="e.g. ENS Associates" 
                    value={jobCompany} 
                    onChange={e => setJobCompany(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Category / Role</label>
                  <select 
                    className="db-form-input" 
                    value={jobRole} 
                    onChange={e => setJobRole(e.target.value)}
                  >
                    <option value="Data Entry">Data Entry</option>
                    <option value="BPO / Telecaller">BPO / Telecaller</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Office Assistant">Office Assistant</option>
                    <option value="Driver">Driver</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div className="db-form-group">
                  <label>Location</label>
                  <input 
                    className="db-form-input" 
                    placeholder="e.g. Indore, MP" 
                    value={jobLocation} 
                    onChange={e => setJobLocation(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Salary (Compensation)</label>
                  <input 
                    className="db-form-input" 
                    placeholder="e.g. ₹25,000/month" 
                    value={jobSalary} 
                    onChange={e => setJobSalary(e.target.value)} 
                    required
                  />
                </div>
                <div className="db-form-group">
                  <label>Job Type</label>
                  <select 
                    className="db-form-input" 
                    value={jobType} 
                    onChange={e => setJobType(e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="db-form-group">
                  <label>Theme Badge Color</label>
                  <input 
                    type="color"
                    className="db-form-input" 
                    style={{ height: 46, padding: '4px 8px', cursor: 'pointer' }}
                    value={jobLogoColor} 
                    onChange={e => setJobLogoColor(e.target.value)} 
                  />
                </div>
                <div className="db-form-group full-width">
                  <label>Job Description and Qualifications</label>
                  <textarea 
                    className="db-form-textarea" 
                    placeholder="Provide detailed description of roles, requirements, and job duties..."
                    value={jobDescription} 
                    onChange={e => setJobDescription(e.target.value)} 
                    required
                  />
                </div>
                <div className="full-width">
                  <button type="submit" className="db-action-btn primary">Publish Listing</button>
                </div>
              </form>
            </div>

            {/* Applicant Manager */}
            <div className="db-content-card">
              <h3 className="db-content-card-title"><Users size={20} /> Manage Received Applications</h3>
              
              <div className="db-table-wrapper">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Applied Position</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map(app => (
                      <tr key={app.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{app.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.email}</div>
                        </td>
                        <td>{app.jobTitle}</td>
                        <td>
                          <span className={`db-status-tag ${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          {app.status === 'Waiting' ? (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button 
                                className="db-action-btn primary" 
                                style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6 }}
                                onClick={() => handleApplicantStatus(app.id, 'Accepted')}
                              >
                                <Check size={14} /> Approve
                              </button>
                              <button 
                                className="db-action-btn danger" 
                                style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6 }}
                                onClick={() => handleApplicantStatus(app.id, 'Rejected')}
                              >
                                <X size={14} /> Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>Reviewed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <div className="db-view-header">
              <div className="db-view-title-group">
                <h2 className="db-view-title">Notifications</h2>
                <p className="db-view-subtitle">Stay up to date with updates and matching alert actions.</p>
              </div>
              {notifications.some(n => n.unread) && (
                <button className="db-action-btn primary" onClick={markAllRead}>Mark All as Read</button>
              )}
            </div>

            <div className="db-content-card">
              <h3 className="db-content-card-title"><Bell size={20} /> Update Logs</h3>
              
              {notifications.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No notifications to show.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`db-notification-item ${notif.unread ? 'unread' : ''}`}
                    >
                      <div className="db-notification-body">
                        <p className="db-notification-text">{notif.text}</p>
                        <span className="db-notification-time">{notif.time}</span>
                      </div>
                      <button 
                        className="db-action-btn danger"
                        style={{ padding: '6px 8px', borderRadius: 6 }}
                        onClick={() => deleteNotification(notif.id)}
                        title="Delete notification"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
