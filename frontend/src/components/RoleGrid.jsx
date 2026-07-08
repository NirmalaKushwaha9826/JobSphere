import { 
  Briefcase, 
  FileSpreadsheet, 
  PhoneCall, 
  Truck, 
  Building, 
  Car, 
  TrendingUp 
} from "lucide-react";
import { allJobs } from "../jobsData";

const rolesConfig = [
  { name: "All", icon: Briefcase, color: "blue" },
  { name: "Data Entry", icon: FileSpreadsheet, color: "indigo" },
  { name: "BPO / Telecaller", icon: PhoneCall, color: "pink" },
  { name: "Delivery", icon: Truck, color: "green" },
  { name: "Office Assistant", icon: Building, color: "teal" },
  { name: "Driver", icon: Car, color: "amber" },
  { name: "Sales", icon: TrendingUp, color: "purple" }
];

const getCardStyles = (colorName) => {
  const themes = {
    blue: {
      "--card-theme-color": "#3b82f6",
      "--card-glow-color": "rgba(59, 130, 246, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      "--icon-bg": "rgba(59, 130, 246, 0.1)"
    },
    indigo: {
      "--card-theme-color": "#6366f1",
      "--card-glow-color": "rgba(99, 102, 241, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      "--icon-bg": "rgba(99, 102, 241, 0.1)"
    },
    pink: {
      "--card-theme-color": "#ec4899",
      "--card-glow-color": "rgba(236, 72, 153, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
      "--icon-bg": "rgba(236, 72, 153, 0.1)"
    },
    green: {
      "--card-theme-color": "#10b981",
      "--card-glow-color": "rgba(16, 185, 129, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      "--icon-bg": "rgba(16, 185, 129, 0.1)"
    },
    teal: {
      "--card-theme-color": "#14b8a6",
      "--card-glow-color": "rgba(20, 184, 166, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
      "--icon-bg": "rgba(20, 184, 166, 0.1)"
    },
    amber: {
      "--card-theme-color": "#f59e0b",
      "--card-glow-color": "rgba(245, 158, 11, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
      "--icon-bg": "rgba(245, 158, 11, 0.1)"
    },
    purple: {
      "--card-theme-color": "#8b5cf6",
      "--card-glow-color": "rgba(139, 92, 246, 0.3)",
      "--card-gradient": "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      "--icon-bg": "rgba(139, 92, 246, 0.1)"
    }
  };
  return themes[colorName] || themes.blue;
};

export default function RoleGrid({ selectedRole = "All", onRoleSelect }) {
  const getJobCount = (roleName) => {
    if (roleName === "All") return allJobs.length;
    return allJobs.filter(job => job.role === roleName).length;
  };

  return (
    <div className="category-explorer-container">
      <div className="category-explorer-header">
        <h2 className="category-explorer-title">Explore by Category</h2>
        <p className="category-explorer-subtitle">
          Find the perfect opportunity matching your expertise and skills across top hiring roles
        </p>
      </div>

      <div className="category-grid">
        {rolesConfig.map((role, i) => {
          const IconComponent = role.icon;
          const isSelected = selectedRole === role.name;
          const count = getJobCount(role.name);
          const themeStyles = getCardStyles(role.color);

          return (
            <div
              key={i}
              className={`category-card ${isSelected ? "selected" : ""}`}
              style={themeStyles}
              onClick={() => onRoleSelect && onRoleSelect(role.name)}
            >
              <div className="category-card-content">
                <div className="category-icon-wrapper">
                  <IconComponent size={28} />
                </div>
                <h4 className="category-name">{role.name}</h4>
                <span className="category-count">
                  {count} {count === 1 ? "Job" : "Jobs"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
