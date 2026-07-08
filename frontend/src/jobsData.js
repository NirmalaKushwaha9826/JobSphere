export const allJobs = [
  {
    id: 1,
    title: "Accountant",
    company: "ENS Associates",
    salary: "₹15,000/month",
    role: "Data Entry",
    location: "Indore, MP",
    jobType: "Full-time",
    experience: "1-3 Years",
    trending: false,
    logoColor: "#4f46e5",
    logoLetter: "E",
    skills: ["Tally", "Excel", "Accounting", "Tax", "Finance"],
    description: "We are seeking a detail-oriented Accountant to join our finance team. The successful candidate will be responsible for preparing financial statements, maintaining the general ledger, and assisting with tax filings. Good proficiency in Excel and Tally is required."
  },
  {
    id: 2,
    title: "Sales Executive",
    company: "AddContact Pvt Ltd",
    salary: "₹18,000/month",
    role: "Sales",
    location: "Bangalore, KA",
    jobType: "Full-time",
    experience: "0-2 Years",
    trending: false,
    logoColor: "#06b6d4",
    logoLetter: "A",
    skills: ["Sales", "Communication", "Marketing", "Business Development"],
    description: "We are looking for an energetic Sales Executive. Candidate should have good communication skills and a strong willingness to work in sales, schedule customer meetings, hit targets, and manage corporate relations."
  },
  {
    id: 3,
    title: "Driver",
    company: "QuickMove",
    salary: "₹20,000/month",
    role: "Driver",
    location: "Mumbai, MH",
    jobType: "Contract",
    experience: "3+ Years",
    trending: false,
    logoColor: "#f59e0b",
    logoLetter: "Q",
    skills: ["Driving", "GPS", "Navigation", "Logistics"],
    description: "Experienced driver required for private corporate travels. Must have a clean driving license, minimum of 3 years of commercial driving experience, and good knowledge of city routes."
  },
  {
    id: 4,
    title: "Delivery Boy",
    company: "FastDrop",
    salary: "₹16,000/month",
    role: "Delivery",
    location: "Delhi, NCR",
    jobType: "Part-time",
    experience: "Entry Level",
    trending: false,
    logoColor: "#10b981",
    logoLetter: "F",
    skills: ["Delivery", "Logistics", "Driving", "Navigation"],
    description: "Delivery executive needed for local logistics. Part-time shifts are available. Android smartphone and own two-wheeler with valid license/insurance are mandatory."
  },
  {
    id: 5,
    title: "Senior Product Designer",
    company: "PixelCraft",
    salary: "₹95,000/month",
    role: "UI/UX",
    location: "Remote / Mumbai",
    jobType: "Full-time",
    experience: "5+ Years",
    trending: true,
    logoColor: "#ec4899",
    logoLetter: "P",
    skills: ["UI/UX", "Product Design", "Figma", "Prototypes", "User Flows", "Design"],
    description: "We are looking for a Senior Product Designer to own user experience across our core mobile and web products. You'll build prototypes, design user flows, and coordinate with engineering teams to construct intuitive tools."
  },
  {
    id: 6,
    title: "Junior React Developer",
    company: "DevsUnited",
    salary: "₹45,000/month",
    role: "Engineering",
    location: "Pune, MH",
    jobType: "Full-time",
    experience: "1-3 Years",
    trending: true,
    logoColor: "#3b82f6",
    logoLetter: "D",
    skills: ["React", "Javascript", "CSS", "Frontend", "Web Development"],
    description: "Join our agile web engineering squad! You'll work closely with tech leads to design and implement interactive frontend applications in React, CSS, and modern state-management systems."
  },
  {
    id: 7,
    title: "BPO Team Lead",
    company: "Apex Telecom",
    salary: "₹32,000/month",
    role: "BPO / Telecaller",
    location: "Noida, UP",
    jobType: "Full-time",
    experience: "2-4 Years",
    trending: true,
    logoColor: "#10b981",
    logoLetter: "T",
    skills: ["BPO", "Calling", "SLA", "Leadership", "Management", "Communication"],
    description: "We are hiring an experienced BPO Team Lead to manage call quality, handle escalations, monitor SLA metrics, and coach agents to meet outbound lead-generation and inbound service goals."
  },
  {
    id: 8,
    title: "Lead Digital Illustrator",
    company: "Vivid Studio",
    salary: "₹60,000/month",
    role: "Design",
    location: "Hyderabad, TS",
    jobType: "Contract",
    experience: "3+ Years",
    trending: true,
    logoColor: "#8b5cf6",
    logoLetter: "V",
    skills: ["Illustration", "Photoshop", "Illustrator", "Design", "Graphics"],
    description: "Create marketing assets, character illustrations, and vector UI assets for games and branding campaigns. Strong digital illustration, Photoshop, and Illustrator skills are required."
  }
];

// Append custom jobs from localStorage on module load
if (typeof window !== "undefined") {
  const customJobsStr = localStorage.getItem("customJobs");
  if (customJobsStr) {
    try {
      const customJobs = JSON.parse(customJobsStr);
      if (Array.isArray(customJobs)) {
        allJobs.push(...customJobs);
      }
    } catch (e) {
      console.error("Error loading custom jobs from localStorage", e);
    }
  }
}

export const addJobApplication = (job) => {
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem("appliedJobs");
  let list = [];
  if (saved) {
    try {
      list = JSON.parse(saved);
    } catch (e) {}
  } else {
    // Default initial mock history
    list = [
      { id: 1, title: 'Sales Executive', company: 'AddContact Pvt Ltd', status: 'Waiting', date: '2026-06-08' },
      { id: 2, title: 'Accountant', company: 'ENS Associates', status: 'Accepted', date: '2026-06-05' },
      { id: 3, title: 'Data Entry', company: 'QuickMove', status: 'Interview', date: '2026-06-03' },
      { id: 4, title: 'Sales Executive', company: 'WebTech Pvt Ltd', status: 'Rejected', date: '2026-05-28' }
    ];
  }

  // Prevent duplicate applications
  if (!list.some(item => String(item.id) === String(job.id))) {
    list.unshift({
      id: job.id,
      title: job.title,
      company: job.company,
      status: 'Waiting',
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem("appliedJobs", JSON.stringify(list));
  }
};

