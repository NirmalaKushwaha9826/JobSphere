import { useNavigate } from "react-router-dom";

export default function JobCard({ id, title, company, salary, location, jobType, logoColor, logoLetter, relevanceScore }) {
  const navigate = useNavigate();

  return (
    <div className="job-card" onClick={() => navigate(`/job/${id}`)}>
      <div className="job-card-header">
        <div 
          className="company-logo-badge" 
          style={{ background: logoColor || 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
        >
          {logoLetter || company.charAt(0)}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {relevanceScore !== undefined && relevanceScore > 0 && (
            <span className="ai-match-badge">
              🤖 {Math.round(relevanceScore)}% Match
            </span>
          )}
          <span className={`job-type-tag ${jobType ? jobType.toLowerCase().replace(' ', '-') : 'full-time'}`}>
            {jobType || "Full-time"}
          </span>
        </div>
      </div>

      <div className="job-card-body">
        <h4 className="job-card-title">{title}</h4>
        <p className="job-card-company">{company}</p>
        
        <div className="job-card-meta">
          <div className="meta-info-item">
            <span className="meta-icon">📍</span>
            <span className="meta-text">{location || "India"}</span>
          </div>
          <div className="meta-info-item">
            <span className="meta-icon">💰</span>
            <span className="meta-text">{salary}</span>
          </div>
        </div>
      </div>

      <div className="job-card-footer">
        <button 
          className="apply-now-btn" 
          onClick={(e) => {
            e.stopPropagation(); // prevent clicking card body from triggering navigate details
            navigate("/apply", { state: { jobId: id, jobTitle: title, companyName: company } });
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

