import { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  Briefcase, 
  Home as HomeIcon, 
  Compass, 
  LayoutDashboard, 
  ChevronDown, 
  Bell, 
  User, 
  Menu, 
  X, 
  LogOut, 
  FileText, 
  LogIn, 
  UserPlus,
  Sun,
  Moon
} from "lucide-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import ApplyJob from "./pages/ApplyJob";
import Success from "./pages/Success";
import Footer from "./components/Footer";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dashboardDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  
  // Read dynamic user login state
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // Handle click outside and Escape key to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDashboardDropdownOpen &&
        dashboardDropdownRef.current &&
        !dashboardDropdownRef.current.contains(event.target)
      ) {
        setIsDashboardDropdownOpen(false);
      }
      if (
        isNotificationsOpen &&
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsDashboardDropdownOpen(false);
        setIsNotificationsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDashboardDropdownOpen, isNotificationsOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDashboardDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  // Close menus on path transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDashboardDropdownOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const userInitials = user?.name 
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) 
    : "KC"; // Default fallback initials

  return (
    <div className="app-container">
      <header className="site-header">
        <div className="header-container">
          {/* Logo Section */}
          <NavLink to="/" className="header-logo-wrapper">
            <div className="logo-icon-container">
              <Briefcase size={22} className="logo-icon" />
            </div>
            <span className="logo-text">JobSphere</span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              <HomeIcon size={18} className="link-icon" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              <Compass size={18} className="link-icon" />
              <span>Explore Jobs</span>
            </NavLink>

            {/* Dashboard Dropdown container */}
            <div 
              ref={dashboardDropdownRef}
              className="nav-dropdown-container"
              onMouseEnter={() => setIsDashboardDropdownOpen(true)}
              onMouseLeave={() => setIsDashboardDropdownOpen(false)}
            >
              <button 
                className={`nav-link-item dropdown-toggle ${isDashboardDropdownOpen ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDashboardDropdownOpen(!isDashboardDropdownOpen);
                }}
              >
                <LayoutDashboard size={18} className="link-icon" />
                <span>Dashboard</span>
                <ChevronDown size={14} className="dropdown-arrow" />
              </button>
              
              {isDashboardDropdownOpen && (
                <div className="dropdown-menu-card">
                  {user ? (
                    <>
                      <div className="dropdown-menu-header">
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                      </div>
                      <hr className="dropdown-divider" />
                      <NavLink 
                        to="/dashboard?tab=profile" 
                        className="dropdown-menu-item"
                        onClick={() => setIsDashboardDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </NavLink>
                      <NavLink 
                        to="/dashboard?tab=applied" 
                        className="dropdown-menu-item"
                        onClick={() => setIsDashboardDropdownOpen(false)}
                      >
                        <FileText size={16} />
                        <span>Applied Jobs</span>
                      </NavLink>
                      <hr className="dropdown-divider" />
                      <button className="dropdown-menu-item logout-btn" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-menu-header">
                        <strong>Guest User</strong>
                        <p>Access is limited</p>
                      </div>
                      <hr className="dropdown-divider" />
                      <NavLink 
                        to="/login" 
                        className="dropdown-menu-item"
                        onClick={() => setIsDashboardDropdownOpen(false)}
                      >
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </NavLink>
                      <NavLink 
                        to="/register" 
                        className="dropdown-menu-item"
                        onClick={() => setIsDashboardDropdownOpen(false)}
                      >
                        <UserPlus size={16} />
                        <span>Create Account</span>
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons (Bell, Profile Avatar, or Login buttons) */}
          <div className="header-right-actions">
            {/* Theme Toggle Button */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} className="theme-icon" /> : <Sun size={20} className="theme-icon" />}
            </button>

            {/* Notification bell */}
            <div ref={notificationsDropdownRef} className="notification-bell-container">
              <button 
                className={`bell-icon-btn ${isNotificationsOpen ? 'active' : ''}`}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="bell-badge-dot"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="notifications-dropdown-menu">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <span className="mark-read">Mark all as read</span>
                  </div>
                  <ul className="notifications-list">
                    <li className="notification-item unread">
                      <div className="noti-indicator"></div>
                      <p>Your application for <strong>Sales Executive</strong> was received!</p>
                      <span>2 hours ago</span>
                    </li>
                    <li className="notification-item">
                      <p>Welcome to JobSphere! Complete your profile to get matches.</p>
                      <span>1 day ago</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Avatar Initials or Logged Out buttons */}
            {user || localStorage.getItem("token") ? (
              <div className="user-profile-badge">
                <div className="avatar-circle-placeholder" title={user?.name || "Khushi Chaurasiya"}>
                  {userInitials}
                </div>
              </div>
            ) : (
              <div className="auth-nav-buttons">
                <NavLink to="/login" className="nav-btn-login">
                  <LogIn size={16} />
                  <span>Login</span>
                </NavLink>
                <NavLink to="/register" className="nav-btn-register">
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </NavLink>
              </div>
            )}

            {/* Mobile Hamburger menu toggle */}
            <button 
              className="mobile-hamburger-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="mobile-navigation-drawer">
            <NavLink to="/" className="mobile-nav-link">
              <HomeIcon size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/dashboard" className="mobile-nav-link">
              <Compass size={18} />
              <span>Explore Jobs</span>
            </NavLink>
            <div className="mobile-nav-divider"></div>
            <div className="mobile-section-header">Dashboard Menu</div>
            <NavLink to="/dashboard" className="mobile-nav-link">
              <User size={18} />
              <span>My Profile</span>
            </NavLink>
            <NavLink to="/dashboard" className="mobile-nav-link">
              <FileText size={18} />
              <span>Applied Jobs</span>
            </NavLink>
            
            <div className="mobile-nav-divider"></div>
            
            {user || localStorage.getItem("token") ? (
              <button className="mobile-nav-link logout-link-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Sign Out ({user?.name || "Profile"})</span>
              </button>
            ) : (
              <div className="mobile-auth-links">
                <NavLink to="/login" className="mobile-nav-link">
                  <LogIn size={18} />
                  <span>Login</span>
                </NavLink>
                <NavLink to="/register" className="mobile-nav-link">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard isLightTheme={theme === 'light'} toggleTheme={toggleTheme} />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/apply" element={<ApplyJob />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


