import { useState } from "react";
import HeroSearch from "../components/HeroSearch";
import RoleGrid from "../components/RoleGrid";
import JobCard from "../components/JobCard";
import TrendingJobCard from "../components/TrendingJobCard";
import TestimonialsSection from "../components/TestimonialsSection";
import { allJobs } from "../jobsData";
import StatsSection from "../components/StatsSection";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSearchQuery("");
    setActiveSearch("");
  };

  const getScoredJobs = () => {
    if (!activeSearch.trim()) {
      const baseJobs = selectedRole === "All"
        ? allJobs
        : allJobs.filter(job => job.role === selectedRole);
      return baseJobs.map(job => ({ ...job, score: 0 }));
    }

    const query = activeSearch.toLowerCase().trim();

    // 1. Location detection
    const locationKeywords = ["bangalore", "mumbai", "pune", "delhi", "noida", "hyderabad", "indore", "remote", "work from home", "wfh"];
    const matchedLocations = locationKeywords.filter(loc => query.includes(loc));
    const queryHasRemote = query.includes("remote") || query.includes("work from home") || query.includes("wfh");

    // 2. Job Type detection
    const jobTypes = ["full-time", "part-time", "contract", "internship"];
    const matchedTypes = jobTypes.filter(t => query.includes(t.replace("-", " ")) || query.includes(t));

    // 3. Experience level detection
    const expKeywords = {
      fresher: ["fresher", "entry level", "junior", "intern", "entry-level"],
      senior: ["senior", "lead", "manager", "director", "experienced", "sr."]
    };
    const queryHasFresher = expKeywords.fresher.some(k => query.includes(k));
    const queryHasSenior = expKeywords.senior.some(k => query.includes(k));

    // 4. Tokenization & general search words
    const stopWords = new Set(["in", "for", "at", "with", "and", "or", "a", "an", "the", "jobs", "job", "hiring", "need", "required"]);
    const queryWords = query.split(/\s+/).filter(word => !stopWords.has(word));

    const scoredList = allJobs.map(job => {
      let score = 0;
      const titleLower = (job.title || "").toLowerCase();
      const descLower = (job.description || "").toLowerCase();
      const locationLower = (job.location || "").toLowerCase();
      const jobTypeLower = (job.jobType || "").toLowerCase();
      const expLower = (job.experience || "").toLowerCase();
      const skillsLower = (job.skills || []).map(s => (s || "").toLowerCase());

      // ---- A. Title Matching (Up to 35 points) ----
      if (titleLower.includes(query) || query.includes(titleLower)) {
        score += 35;
      } else {
        const matchingTitleWords = queryWords.filter(word => titleLower.includes(word));
        if (matchingTitleWords.length > 0) {
          score += Math.min(30, matchingTitleWords.length * 15);
        }
      }

      // ---- B. Skill Matching (Up to 30 points) ----
      if (job.skills && job.skills.length > 0) {
        const matchingSkills = skillsLower.filter(skill => query.includes(skill));
        if (matchingSkills.length > 0) {
          score += Math.min(30, matchingSkills.length * 15);
        }
      }

      // ---- C. Location Matching (Up to 20 points) ----
      if (matchedLocations.length > 0) {
        const isRemoteLocation = locationLower.includes("remote") || jobTypeLower.includes("remote");
        if (queryHasRemote && isRemoteLocation) {
          score += 20;
        } else {
          const hasLocMatch = matchedLocations.some(loc => locationLower.includes(loc));
          if (hasLocMatch) {
            score += 20;
          }
        }
      }

      // ---- D. Job Type Matching (Up to 10 points) ----
      if (matchedTypes.length > 0) {
        const hasTypeMatch = matchedTypes.some(t => jobTypeLower.includes(t.replace("jobs", "").trim()));
        if (hasTypeMatch) {
          score += 10;
        }
      }

      // ---- E. Experience Level Matching (Up to 10 points) ----
      if (queryHasFresher) {
        const isEntry = expLower.includes("entry") || expLower.includes("0-2") || expLower.includes("1-3");
        if (isEntry) {
          score += 10;
        }
      } else if (queryHasSenior) {
        const isSenior = expLower.includes("5+") || expLower.includes("3+") || expLower.includes("2-4");
        if (isSenior) {
          score += 10;
        }
      }

      // ---- F. Description Keyword Matching (Bonus up to 10 points) ----
      const descMatches = queryWords.filter(word => descLower.includes(word));
      if (descMatches.length > 0) {
        score += Math.min(10, descMatches.length * 3);
      }

      return {
        ...job,
        score: Math.min(100, score)
      };
    });

    return scoredList
      .filter(job => job.score >= 10)
      .sort((a, b) => b.score - a.score);
  };

  const displayJobs = getScoredJobs();
  const trendingJobs = allJobs.filter(job => job.trending === true);

  return (
    <>
      <HeroSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={(val) => {
          setActiveSearch(val);
          setSelectedRole("All");
          setTimeout(() => {
            document.getElementById("explore-jobs")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />
      
      <StatsSection />
      
      <div id="explore-jobs" style={{ scrollMarginTop: "20px" }}>
        <RoleGrid selectedRole={selectedRole} onRoleSelect={handleRoleSelect} />
      </div>

      <h3 style={{ marginTop: 30 }}>
        {activeSearch 
          ? `🔍 AI Search Results for "${activeSearch}"` 
          : `🔥 Spotlight Jobs ${selectedRole !== "All" ? `- ${selectedRole}` : ""}`}
      </h3>

      <div className="job-grid">
        {displayJobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            salary={job.salary}
            location={job.location}
            jobType={job.jobType}
            logoColor={job.logoColor}
            logoLetter={job.logoLetter}
            relevanceScore={activeSearch ? job.score : 0}
          />
        ))}
        {displayJobs.length === 0 && (
          <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "40px 20px", color: "var(--text-secondary)" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 15 }}>🔎</span>
            <h4 style={{ color: "#fff", margin: "0 0 8px 0" }}>No Matching Jobs Found</h4>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>We couldn't find any jobs matching your smart query. Try keywords like "React", "Remote", "Freshers", or "Mumbai".</p>
          </div>
        )}
      </div>

      {/* ⚡ Trending Jobs Section */}
      <div className="trending-section">
        <div className="trending-section-header">
          <div className="trending-title-group">
            <h3 className="trending-title">⚡ Trending Opportunities</h3>
            <p className="trending-subtitle">Top-rated positions with quick responses and premium benefits.</p>
          </div>
        </div>

        <div className="trending-grid">
          {trendingJobs.map(job => (
            <TrendingJobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              salary={job.salary}
              location={job.location}
              jobType={job.jobType}
              experience={job.experience}
              logoColor={job.logoColor}
              logoLetter={job.logoLetter}
            />
          ))}
        </div>
      </div>

      {/* 🗣️ Testimonials Slider Section */}
      <TestimonialsSection />
    </>
  );
}
