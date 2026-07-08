import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Neha Sharma",
    role: "UI/UX Designer",
    company: "ENS Associates",
    quote: "JobSphere helped me land a designer role at ENS Associates in just 2 weeks! The category explorer and quick profile updates made it incredibly fast and fun to find my path.",
    rating: 5,
    avatar: "/avatar1.png",
    accentColor: "#ec4899"
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Junior React Developer",
    company: "DevsUnited",
    quote: "As a candidate, I bookmarked a few developer openings and applied instantly. Within a week, I was scheduled for interviews. The glassmorphic login interface is stunning!",
    rating: 5,
    avatar: "/avatar2.png",
    accentColor: "#3b82f6"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Recruiting Manager",
    company: "Apex Telecom",
    quote: "Posting jobs and reviewing applicant statuses from the Recruiter Hub is extremely smooth. We found multiple qualified candidates and hired them in record time. A must-use platform!",
    rating: 5,
    avatar: "/avatar3.png",
    accentColor: "#10b981"
  },
  {
    id: 4,
    name: "Rohan Mehta",
    role: "Senior DevOps Engineer",
    company: "CloudScale Systems",
    quote: "Managing cloud infrastructure is a breeze after I updated my credentials on JobSphere. Recruiters reached out with roles matching my exact tech stack within hours. Outstanding experience!",
    rating: 5,
    avatar: "/avatar1.png",
    accentColor: "#8b5cf6"
  },
  {
    id: 5,
    name: "Ananya Rao",
    role: "Data Analyst",
    company: "FinTech Corp",
    quote: "I love the clean analytics dashboard and how easy it is to track application progress. The live status updates kept me informed every step of the way. Truly a premium job hunting experience.",
    rating: 5,
    avatar: "/avatar3.png",
    accentColor: "#fb923c"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => {
      setAnimating(false);
    }, 600); // matches the transition duration in CSS
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  const handleDotClick = (index) => {
    if (animating || index === currentIndex) return;
    setAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  const handleCardClick = (index, position) => {
    if (animating) return;
    if (position === "left") {
      handlePrev();
    } else if (position === "right") {
      handleNext();
    }
  };

  const getPositionClass = (index) => {
    const total = testimonials.length;
    let diff = index - currentIndex;

    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    if (diff === 0) return "active";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    return "hidden";
  };

  const currentAccent = testimonials[currentIndex].accentColor;

  return (
    <section 
      className="testimonials-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="testimonials-header">
        <h3 className="testimonials-title">🗣️ What Our Users Say</h3>
        <p className="testimonials-subtitle">Discover how JobSphere connects talented professionals with their dream teams.</p>
      </div>

      <div className="testimonials-slider-container">
        {/* Navigation Arrows */}
        <button 
          className="slider-arrow-btn prev-btn" 
          onClick={handlePrev} 
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        {/* 3D Testimonials Stack */}
        <div className="testimonials-cards-wrapper">
          {testimonials.map((item, index) => {
            const position = getPositionClass(index);
            return (
              <div 
                key={item.id}
                className={`testimonial-card-item ${position}`}
                style={{ "--testimonial-accent": item.accentColor }}
                onClick={() => handleCardClick(index, position)}
              >
                <div className="testimonial-card">
                  <div className="testimonial-card-glow" style={{ backgroundColor: item.accentColor }}></div>
                  
                  <span className="quote-icon-bg"><Quote size={80} /></span>

                  <div className="testimonial-stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="star-icon">★</span>
                    ))}
                  </div>

                  <p className="testimonial-quote">"{item.quote}"</p>

                  <div className="testimonial-author-row">
                    <img 
                      src={item.avatar} 
                      alt={`${item.name} Headshot`} 
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-author-details">
                      <h4 className="testimonial-author-name">{item.name}</h4>
                      <p className="testimonial-author-role">
                        {item.role} at <span style={{ color: item.accentColor, fontWeight: 700 }}>{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className="slider-arrow-btn next-btn" 
          onClick={handleNext} 
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slider Indicator Dots */}
      <div className="slider-dots">
        {testimonials.map((item, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{ 
              backgroundColor: index === currentIndex ? currentAccent : "rgba(255, 255, 255, 0.2)",
              width: index === currentIndex ? "28px" : "10px"
            }}
          ></button>
        ))}
      </div>
    </section>
  );
}
