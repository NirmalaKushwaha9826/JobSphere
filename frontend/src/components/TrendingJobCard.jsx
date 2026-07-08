import { useNavigate } from "react-router-dom";

export default function TrendingJobCard({ id, title, company, salary, location, jobType, experience, logoColor, logoLetter }) {
  const navigate = useNavigate();

  return (
    <div className="trending-job-card" onClick={() => navigate(`/job/${id}`)}>
      {/* Glow highlight background inside the card */}
      <div className="trending-card-glow" style={{ backgroundColor: logoColor || '#3b82f6' }}></div>

      <div className="trending-card-header">
        <div 
          className="trending-logo-badge" 
          style={{ background: logoColor || 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
        >
          {logoLetter || company.charAt(0)}
        </div>
        <div className="trending-badge-wrapper">
          <span className="trending-fire-badge">
            <span className="pulse-dot"></span>
            🔥 Trending
          </span>
        </div>
      </div>

      <div className="trending-card-body">
        <h4 className="trending-card-title">{title}</h4>
        <p className="trending-card-company">{company}</p>
        
        {/* Badges row */}
        <div className="trending-tag-row">
          <span className={`trending-tag-badge type-${jobType ? jobType.toLowerCase().replace(' ', '-') : 'full-time'}`}>
            {jobType || "Full-time"}
          </span>
          <span className="trending-tag-badge experience-badge">
            💼 {experience || "Entry Level"}
          </span>
        </div>

        {/* Meta details */}
        <div className="trending-card-meta">
          <div className="trending-meta-item">
            <span className="trending-meta-icon">📍</span>
            <span className="trending-meta-text">{location || "India"}</span>
          </div>
          <div className="trending-meta-item">
            <span className="trending-meta-icon">💰</span>
            <span className="trending-meta-text">{salary}</span>
          </div>
        </div>
      </div>

      <div className="trending-card-footer">
        <button 
          className="trending-apply-btn" 
          onClick={(e) => {
            e.stopPropagation();
            navigate("/apply", { state: { jobId: id, jobTitle: title, companyName: company } });
          }}
        >
          Quick Apply
        </button>
      </div>
    </div>
  );
}
