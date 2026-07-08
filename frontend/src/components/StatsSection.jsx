export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "1,000+",
      label: "Live Jobs Available",
      iconColor: "#2563eb",
      bgColor: "rgba(37, 99, 235, 0.1)",
      // Briefcase SVG
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      )
    },
    {
      id: 2,
      value: "500+",
      label: "Active Companies",
      iconColor: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      // Office Building SVG
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm8 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2z"/>
        </svg>
      )
    },
    {
      id: 3,
      value: "10,000+",
      label: "Verified Candidates",
      iconColor: "#6366f1",
      bgColor: "rgba(99, 102, 241, 0.1)",
      // Users Group SVG
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="stats-section">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stats-card">
            <div 
              className="stats-icon-wrapper" 
              style={{ color: stat.iconColor, backgroundColor: stat.bgColor }}
            >
              {stat.svg}
            </div>
            <div className="stats-info">
              <h2 className="stats-value">{stat.value}</h2>
              <p className="stats-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
