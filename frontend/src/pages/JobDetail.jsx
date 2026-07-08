import { useNavigate, useParams } from "react-router-dom";
import { allJobs } from "../jobsData";

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Find job details, fallback to first job if not found
  const job = allJobs.find(j => j.id === parseInt(id)) || allJobs[0];

  return (
    <div className="job-detail">
      <div className="job-detail-card">
        <div className="job-detail-header">
          <div 
            className="company-logo-badge large" 
            style={{ background: job.logoColor || 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
          >
            {job.logoLetter || job.company.charAt(0)}
          </div>
          <div className="job-detail-title-wrapper">
            <h2>{job.title}</h2>
            <p className="job-detail-company">{job.company}</p>
          </div>
        </div>

        <div className="job-detail-meta-grid">
          <div className="detail-meta-card">
            <span className="meta-icon">📍</span>
            <div>
              <strong>Location</strong>
              <p>{job.location || "India"}</p>
            </div>
          </div>
          <div className="detail-meta-card">
            <span className="meta-icon">💰</span>
            <div>
              <strong>Salary</strong>
              <p>{job.salary}</p>
            </div>
          </div>
          <div className="detail-meta-card">
            <span className="meta-icon">💼</span>
            <div>
              <strong>Job Type</strong>
              <p>{job.jobType || "Full-time"}</p>
            </div>
          </div>
          <div className="detail-meta-card">
            <span className="meta-icon">🎓</span>
            <div>
              <strong>Experience</strong>
              <p>{job.experience || "Entry Level"}</p>
            </div>
          </div>
        </div>

        <div className="job-detail-description">
          <h3>Job Description</h3>
          <p>{job.description || "No description provided."}</p>
        </div>

        {/* Scroll space */}
        <div style={{ height: "100px" }}></div>

        {/* Apply section */}
        <div className="apply-box">
          <button onClick={() => navigate("/apply", { state: { jobId: job.id, jobTitle: job.title, companyName: job.company } })}>
            Apply for Job
          </button>
        </div>
      </div>
    </div>
  );
}

