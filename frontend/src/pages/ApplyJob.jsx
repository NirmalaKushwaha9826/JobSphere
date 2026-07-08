import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { addJobApplication } from "../jobsData";
import { CheckCircle, ArrowRight, Loader2, Sparkles, Send, FileText, User as UserIcon, Mail, Phone, MapPin, GraduationCap, Code } from "lucide-react";

export default function ApplyJob() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const jobId = location.state?.jobId || 0;
  const jobTitle = location.state?.jobTitle || "";
  const companyName = location.state?.companyName || "";

  // Read user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  const isCandidate = user?.role === "candidate";
  const isProfileComplete = user && isCandidate && user.phone && user.location && user.education && user.skills && user.resumeName;

  // Application States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appliedDetails, setAppliedDetails] = useState(null);

  // Manual Form States
  const [phone, setPhone] = useState(user?.phone || "");
  const [loc, setLoc] = useState(user?.location || "");
  const [education, setEducation] = useState(user?.education || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [resumeName, setResumeName] = useState(user?.resumeName || "");
  const [saveToProfile, setSaveToProfile] = useState(true);

  // Trigger Automatic One-Click Apply if Profile is Complete
  useEffect(() => {
    if (isProfileComplete && jobId) {
      setIsProcessing(true);
      
      const timer = setTimeout(() => {
        // Submit application to history
        const job = { id: jobId, title: jobTitle, company: companyName };
        addJobApplication(job);
        
        // Save submitted details to show in success screen
        setAppliedDetails({
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          education: user.education,
          skills: user.skills,
          resumeName: user.resumeName,
          type: "One-Click AI Apply"
        });
        
        setIsProcessing(false);
        setIsSuccess(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isProfileComplete, jobId, jobTitle, companyName, user]);

  // Submit Manual Form Fallback
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!resumeName) {
      alert("Please upload/select a resume.");
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      // Add application to history
      const job = { id: jobId, title: jobTitle, company: companyName };
      addJobApplication(job);

      // Save details to profile if checked
      if (saveToProfile && user) {
        const updatedUser = {
          ...user,
          phone,
          location: loc,
          education,
          skills,
          resumeName
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setAppliedDetails({
        name: user?.name || "Guest",
        email: user?.email || "Guest Email",
        phone,
        location: loc,
        education,
        skills,
        resumeName,
        type: "Manual Form Apply"
      });

      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Redirect non-logged in or non-candidate users
  if (!user) {
    return (
      <div className="apply-page-wrapper">
        <div className="glass-apply-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: 16 }}>🔒</span>
          <h3>Candidate Login Required</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.95rem" }}>
            You must be logged in as a candidate to apply for this job.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <NavLink to="/login" className="nav-btn-register" style={{ textDecoration: "none" }}>Sign In</NavLink>
            <NavLink to="/register" className="nav-btn-login" style={{ textDecoration: "none", border: "1px solid var(--border-color)" }}>Create Account</NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "employer") {
    return (
      <div className="apply-page-wrapper">
        <div className="glass-apply-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: 16 }}>💼</span>
          <h3>Employer Mode Active</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.95rem" }}>
            As an Employer, you post job listings. Switch accounts to a Candidate profile to apply for openings.
          </p>
          <NavLink to="/dashboard" className="nav-btn-register" style={{ textDecoration: "none", display: "inline-block" }}>
            Back to Dashboard
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-page-wrapper">
      <div className="auth-bg-glow-1"></div>
      <div className="auth-bg-glow-2"></div>

      {isProcessing && (
        <div className="glass-apply-card" style={{ textAlign: "center", padding: "50px 30px" }}>
          <Loader2 className="spinner-loader" size={48} style={{ color: "var(--primary-hover)", margin: "0 auto 20px auto", animation: "spin 1.5s linear infinite" }} />
          <h3 style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Sparkles size={20} style={{ color: "var(--warning)" }} /> Processing Smart Apply...
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>
            {isProfileComplete 
              ? "Submitting your application automatically using your saved profile and resume."
              : "Verifying form inputs and submitting your application."}
          </p>
        </div>
      )}

      {!isProcessing && isSuccess && appliedDetails && (
        <div className="glass-apply-card success-view" style={{ textAlign: "center", padding: "40px 30px" }}>
          <div className="success-icon-wrapper" style={{ margin: "0 auto 20px auto", width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(16,185,129,0.15)", border: "2px dashed #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={36} style={{ color: "var(--success)" }} />
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "#fff", marginBottom: 6 }}>Application Submitted!</h2>
          <p style={{ color: "var(--success)", fontSize: "0.95rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 24 }}>
            ⚡ {appliedDetails.type} Successful
          </p>

          <div className="applied-summary-box">
            <h4 style={{ textAlign: "left", margin: "0 0 12px 0", color: "#fff", fontSize: "0.95rem", borderBottom: "1px solid var(--border-color)", paddingBottom: 6 }}>
              Submitted Profile Details
            </h4>
            <div className="summary-grid">
              <div className="summary-row">
                <span className="summary-label">Applied For:</span>
                <span className="summary-value" style={{ color: "var(--primary-hover)", fontWeight: 700 }}>{jobTitle}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Company:</span>
                <span className="summary-value" style={{ fontWeight: 600 }}>{companyName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Applicant Name:</span>
                <span className="summary-value">{appliedDetails.name}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{appliedDetails.email}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Phone:</span>
                <span className="summary-value">{appliedDetails.phone}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Location:</span>
                <span className="summary-value">{appliedDetails.location}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Education:</span>
                <span className="summary-value">{appliedDetails.education}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Skills:</span>
                <span className="summary-value">{appliedDetails.skills}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Resume:</span>
                <span className="summary-value" style={{ color: "var(--warning)", display: "flex", alignItems: "center", gap: 4 }}>
                  📄 {appliedDetails.resumeName}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
            <NavLink to="/dashboard?tab=applied" className="nav-btn-register" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              View Applied History <ArrowRight size={16} />
            </NavLink>
            <NavLink to="/dashboard" className="nav-btn-login" style={{ textDecoration: "none", border: "1px solid var(--border-color)" }}>
              Explore More Jobs
            </NavLink>
          </div>
        </div>
      )}

      {!isProcessing && !isSuccess && (
        <div className="glass-apply-card">
          <h2 className="auth-title">Complete Application Form</h2>
          <p className="auth-subtitle" style={{ marginBottom: 24 }}>
            Applying for <strong>{jobTitle}</strong> at <strong>{companyName}</strong>
          </p>

          <form onSubmit={handleManualSubmit} className="auth-form apply-form">
            {/* Full Name */}
            <div className="auth-input-group disabled">
              <span className="auth-input-icon"><UserIcon size={18} /></span>
              <input 
                className="auth-input" 
                value={user.name} 
                disabled
                title="Your name is pre-filled from your profile"
              />
            </div>

            {/* Email Address */}
            <div className="auth-input-group disabled">
              <span className="auth-input-icon"><Mail size={18} /></span>
              <input 
                className="auth-input" 
                value={user.email} 
                disabled
                title="Your email is pre-filled from your profile"
              />
            </div>

            {/* Phone */}
            <div className="auth-input-group">
              <span className="auth-input-icon"><Phone size={18} /></span>
              <input 
                className="auth-input" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
              />
            </div>

            {/* Location */}
            <div className="auth-input-group">
              <span className="auth-input-icon"><MapPin size={18} /></span>
              <input 
                className="auth-input" 
                value={loc} 
                onChange={e => setLoc(e.target.value)}
                placeholder="City & State"
                required
              />
            </div>

            {/* Education */}
            <div className="auth-input-group">
              <span className="auth-input-icon"><GraduationCap size={18} /></span>
              <input 
                className="auth-input" 
                value={education} 
                onChange={e => setEducation(e.target.value)}
                placeholder="Highest Education"
                required
              />
            </div>

            {/* Skills */}
            <div className="auth-input-group">
              <span className="auth-input-icon"><Code size={18} /></span>
              <input 
                className="auth-input" 
                value={skills} 
                onChange={e => setSkills(e.target.value)}
                placeholder="Key Skills (comma separated)"
                required
              />
            </div>

            {/* Resume upload simulated */}
            <div className="auth-input-group" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", marginBottom: 20 }}>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Resume File (required)</label>
              <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
                <input 
                  type="file" 
                  id="manual-resume-upload" 
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={e => {
                    if (e.target.files[0]) {
                      setResumeName(e.target.files[0].name);
                    }
                  }}
                />
                <label 
                  htmlFor="manual-resume-upload" 
                  className="db-action-btn secondary"
                  style={{ padding: "10px 18px", fontSize: "0.9rem", margin: 0, cursor: "pointer", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#fff", display: "inline-flex", gap: 6, alignItems: "center" }}
                >
                  📁 Upload Resume
                </label>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
                  {resumeName ? `File: ${resumeName}` : "No file selected"}
                </span>
              </div>
            </div>

            {/* Save to profile checkbox */}
            <div className="terms-checkbox-container" style={{ marginBottom: 20 }}>
              <input 
                type="checkbox" 
                id="saveToProfile"
                checked={saveToProfile}
                onChange={e => setSaveToProfile(e.target.checked)}
              />
              <label htmlFor="saveToProfile" style={{ fontSize: "0.9rem" }}>
                Save these details to my profile for future One-Click applications
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="auth-submit-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={16} /> Submit Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
