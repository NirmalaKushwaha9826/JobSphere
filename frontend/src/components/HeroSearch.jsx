import { useState, useEffect, useRef } from "react";

const POPULAR_SUGGESTIONS = [
  "React Developer in Bangalore",
  "Remote Java Jobs",
  "Freshers Software Engineer",
  "Work from Home Jobs"
];

const ALL_SUGGESTIONS = [
  "React Developer in Bangalore",
  "Remote Java Jobs",
  "Freshers Software Engineer",
  "Work from Home Jobs",
  "Junior React Developer in Pune",
  "Senior Product Designer in Remote",
  "Accountant in Indore",
  "Sales Executive in Bangalore",
  "Driver in Mumbai",
  "Delivery Boy in Delhi",
  "BPO Team Lead in Noida",
  "Lead Digital Illustrator in Hyderabad",
  "Remote UI/UX Jobs",
  "Part-time Jobs",
  "Contract Design Jobs"
];

export default function HeroSearch({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const handleFindJobClick = () => {
    const element = document.getElementById("explore-jobs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter suggestions based on query
  const getSuggestions = () => {
    if (!searchQuery.trim()) {
      return POPULAR_SUGGESTIONS;
    }
    return ALL_SUGGESTIONS.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  };

  const suggestions = getSuggestions();

  // Reset focus index when suggestions list changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        const selected = suggestions[focusedIndex];
        setSearchQuery(selected);
        onSearchSubmit(selected);
      } else {
        onSearchSubmit(searchQuery);
      }
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    onSearchSubmit(suggestion);
    setIsDropdownOpen(false);
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="suggestion-text-match">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="hero-banner">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Find Your Dream Job Today</h1>
        <p className="hero-subtitle">
          Connect with top employers and discover opportunities that match your skills, passion, and ambition.
        </p>
        
        <div className="hero-cta-wrapper">
          <button className="hero-cta-btn" onClick={handleFindJobClick}>
            Find Your Dream Job
          </button>
        </div>

        <div className="hero-search-box" ref={searchRef}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search jobs here (e.g. React Developer in Bangalore)..."
            />
          </div>
          <button 
            className="search-btn"
            onClick={() => {
              onSearchSubmit(searchQuery);
              setIsDropdownOpen(false);
            }}
          >
            Search
          </button>

          {isDropdownOpen && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              <div className="suggestion-header">
                {!searchQuery.trim() ? "🔥 Popular Searches" : "💡 AI Suggestions"}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={`suggestion-item ${index === focusedIndex ? 'focused' : ''}`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span className="suggestion-icon">⚡</span>
                  {highlightMatch(suggestion, searchQuery)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
