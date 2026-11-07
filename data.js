/**
 * Job Portal - Seed Data & LocalStorage Management
 * Handles persistent storage for Jobs, Saved Jobs, Applications, and Companies.
 */

const SEED_JOBS = [
  {
    id: "job-101",
    title: "Senior Full Stack Engineer",
    company: "CloudScale Systems",
    logoColor: "#4f46e5",
    logoInitials: "CS",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "Senior",
    salary: "₹24 - 32 LPA",
    postedDate: "2026-11-05",
    featured: true,
    tags: ["React", "Node.js", "AWS", "TypeScript"],
    overview: "Looking for a seasoned Full Stack Engineer to lead our core cloud orchestration platform architecture.",
    responsibilities: [
      "Architect and scale microservices running on AWS ECS and Lambda.",
      "Design intuitive, responsive user interfaces using modern React and TypeScript.",
      "Collaborate with DevOps and Product teams to ensure high uptime and 99.9% availability.",
      "Mentor junior and mid-level developers through thorough code reviews."
    ],
    requirements: [
      "5+ years of experience with React, Node.js, and relational databases (PostgreSQL).",
      "Hands-on expertise with AWS cloud infrastructure and CI/CD pipelines.",
      "Strong understanding of RESTful API design and system scalability."
    ],
    benefits: [
      "Competitive stock options and annual performance bonus.",
      "Flexible hybrid work policy (2 days office, 3 days home).",
      "Comprehensive health and wellness insurance for family."
    ]
  },
  {
    id: "job-102",
    title: "Cloud & DevOps Specialist",
    company: "Nexus FinTech",
    logoColor: "#0284c7",
    logoInitials: "NF",
    location: "Remote",
    type: "Remote",
    experience: "Mid",
    salary: "₹16 - 22 LPA",
    postedDate: "2026-11-06",
    featured: true,
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    overview: "Join our FinTech team to automate our multi-region AWS cloud deployments with high security compliance.",
    responsibilities: [
      "Maintain and automate infrastructure as code using Terraform and Ansible.",
      "Manage Kubernetes clusters and monitor production logs via Datadog and CloudWatch.",
      "Implement zero-trust security and IAM policies across banking integrations."
    ],
    requirements: [
      "3+ years of experience in DevOps and AWS operations.",
      "Solid scripting skills in Bash or Python.",
      "Knowledge of PCI-DSS financial security standards is a plus."
    ],
    benefits: [
      "100% remote anywhere within India/IST timezone.",
      "Home office setup stipend (₹50,000).",
      "Annual conference and learning allowance."
    ]
  },
  {
    id: "job-103",
    title: "Junior Frontend Developer",
    company: "InnovateX Digital",
    logoColor: "#10b981",
    logoInitials: "IX",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "Entry",
    salary: "₹6 - 9 LPA",
    postedDate: "2026-11-07",
    featured: true,
    tags: ["JavaScript", "HTML/CSS", "React", "Git"],
    overview: "Great opportunity for early-career developers looking to build modern web interfaces with mentorship from senior engineers.",
    responsibilities: [
      "Translate Figma designs into clean, accessible HTML/CSS and JavaScript.",
      "Fix UI bugs and improve cross-browser compatibility across mobile and desktop.",
      "Write unit tests for UI components using Jest."
    ],
    requirements: [
      "B.Tech / BCA or equivalent in Computer Science or related degree.",
      "Proficient in HTML5, CSS3, modern JavaScript (ES6+), and basic React.",
      "Strong attention to detail and good communication skills."
    ],
    benefits: [
      "Structured mentorship and fast-track promotion program.",
      "Free daily gourmet lunch and snacks at campus.",
      "Health insurance from Day 1."
    ]
  },
  {
    id: "job-104",
    title: "Web Development Intern",
    company: "PixelCraft Studios",
    logoColor: "#f59e0b",
    logoInitials: "PC",
    location: "Mumbai, India",
    type: "Internship",
    experience: "Entry",
    salary: "₹25,000 / month",
    postedDate: "2026-11-07",
    featured: false,
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    overview: "A 6-month hands-on paid internship for ambitious students or fresh graduates eager to gain real client project experience.",
    responsibilities: [
      "Assist in building responsive landing pages and interactive marketing widgets.",
      "Optimize images and assets for web performance.",
      "Collaborate with the creative design team on animations and micro-interactions."
    ],
    requirements: [
      "Knowledge of HTML, CSS, JavaScript, and responsive design fundamentals.",
      "Familiarity with Git and GitHub basics.",
      "Enthusiasm for learning new web technologies."
    ],
    benefits: [
      "Opportunity for full-time conversion based on performance.",
      "Certificate of Internship and formal recommendation letter.",
      "Flexible college exam leaves."
    ]
  },
  {
    id: "job-105",
    title: "Lead UI/UX & Web Designer",
    company: "Aura Creative Tech",
    logoColor: "#8b5cf6",
    logoInitials: "AC",
    location: "Pune, India",
    type: "Full-time",
    experience: "Senior",
    salary: "₹20 - 28 LPA",
    postedDate: "2026-11-04",
    featured: true,
    tags: ["Figma", "Design Systems", "HTML/CSS", "Prototyping"],
    overview: "Lead our product design system and craft intuitive digital experiences for enterprise SaaS products.",
    responsibilities: [
      "Maintain and evolve our unified cross-product design tokens and component libraries in Figma.",
      "Conduct user research interviews and turn findings into wireframes and high-fidelity mockups.",
      "Partner closely with frontend engineering to ensure pixel-perfect implementation."
    ],
    requirements: [
      "6+ years of UX/UI design experience for complex web or mobile apps.",
      "Strong portfolio demonstrating web design and user journey mapping.",
      "Basic understanding of HTML/CSS capabilities and constraints."
    ],
    benefits: [
      "Top-tier MacBook Pro + dual 4K monitor setup.",
      "Flexible working hours.",
      "Wellness allowance and gym membership."
    ]
  },
  {
    id: "job-106",
    title: "Backend API Engineer (Python / FastAPI)",
    company: "DataSphere AI",
    logoColor: "#ec4899",
    logoInitials: "DS",
    location: "Delhi NCR, India",
    type: "Full-time",
    experience: "Mid",
    salary: "₹14 - 19 LPA",
    postedDate: "2026-11-03",
    featured: false,
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    overview: "Build high-throughput RESTful endpoints and data pipelines powering real-time AI analytics dashboards.",
    responsibilities: [
      "Develop async Python microservices with FastAPI and SQLAlchemy.",
      "Design database schemas, query optimizations, and Redis caching layers.",
      "Integrate vector databases and LLM APIs for AI-powered search features."
    ],
    requirements: [
      "3-5 years experience developing production backend APIs in Python.",
      "Deep understanding of SQL, caching strategies, and concurrency.",
      "Experience with Docker containerization."
    ],
    benefits: [
      "Direct work on cutting-edge AI features.",
      "Health insurance including OPD coverage.",
      "Relocation reimbursement for Delhi NCR."
    ]
  },
  {
    id: "job-107",
    title: "Part-Time Technical Writer & Docs Specialist",
    company: "CloudScale Systems",
    logoColor: "#4f46e5",
    logoInitials: "CS",
    location: "Remote",
    type: "Part-time",
    experience: "Mid",
    salary: "₹40,000 / month",
    postedDate: "2026-11-02",
    featured: false,
    tags: ["Technical Writing", "Markdown", "Developer Docs", "API"],
    overview: "Create clear, developer-friendly API guides, tutorials, and release notes for our cloud platform.",
    responsibilities: [
      "Write developer quickstarts, code snippets, and configuration walk-throughs.",
      "Review PRs for documentation accuracy and maintain markdown documentation sites.",
      "Gather feedback from developer community to improve doc clarity."
    ],
    requirements: [
      "2+ years experience writing developer or technical documentation.",
      "Ability to read JavaScript and Python code samples.",
      "15-20 hours per week commitment with flexible schedule."
    ],
    benefits: [
      "Fully asynchronous workflow.",
      "Paid hourly or monthly retainer.",
      "Access to all company learning resources."
    ]
  },
  {
    id: "job-108",
    title: "Software QA Automation Engineer",
    company: "Nexus FinTech",
    logoColor: "#0284c7",
    logoInitials: "NF",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "Mid",
    salary: "₹12 - 16 LPA",
    postedDate: "2026-11-01",
    featured: false,
    tags: ["Cypress", "Selenium", "JavaScript", "Postman"],
    overview: "Build automated test suites for our payment checkout and transaction processing web applications.",
    responsibilities: [
      "Design, write, and execute automated end-to-end regression tests using Cypress.",
      "Perform automated and exploratory API testing with Postman.",
      "Integrate automated test runs into GitHub Actions CI pipeline."
    ],
    requirements: [
      "3+ years experience in automated software testing for web applications.",
      "Proficiency in JavaScript or TypeScript for writing test suites.",
      "Knowledge of continuous integration workflows."
    ],
    benefits: [
      "Competitive salary with bi-annual performance appraisals.",
      "Commuter shuttle service.",
      "Health insurance and accident coverage."
    ]
  }
];

const SEED_COMPANIES = [
  {
    id: "comp-1",
    name: "CloudScale Systems",
    logoColor: "#4f46e5",
    logoInitials: "CS",
    industry: "Cloud & Infrastructure",
    location: "Bengaluru, India & Remote",
    employees: "250 - 500",
    rating: "4.8",
    openRoles: 2,
    website: "https://cloudscale.example.com",
    about: "CloudScale Systems builds enterprise cloud management and deployment orchestration platforms trusted by leading SaaS businesses."
  },
  {
    id: "comp-2",
    name: "Nexus FinTech",
    logoColor: "#0284c7",
    logoInitials: "NF",
    industry: "Financial Technology",
    location: "Bengaluru / Remote",
    employees: "500 - 1,000",
    rating: "4.6",
    openRoles: 2,
    website: "https://nexusfintech.example.com",
    about: "Nexus FinTech provides next-generation payment gateways, reconciliation engines, and secure digital transaction infrastructure."
  },
  {
    id: "comp-3",
    name: "InnovateX Digital",
    logoColor: "#10b981",
    logoInitials: "IX",
    industry: "Software Services & IT",
    location: "Hyderabad, India",
    employees: "100 - 250",
    rating: "4.5",
    openRoles: 1,
    website: "https://innovatex.example.com",
    about: "InnovateX crafts custom digital platforms and responsive mobile-first applications for global technology clients."
  },
  {
    id: "comp-4",
    name: "PixelCraft Studios",
    logoColor: "#f59e0b",
    logoInitials: "PC",
    industry: "Digital Media & Agency",
    location: "Mumbai, India",
    employees: "50 - 100",
    rating: "4.7",
    openRoles: 1,
    website: "https://pixelcraft.example.com",
    about: "A creative agency building brand identities, responsive web experiences, and award-winning interactive designs."
  },
  {
    id: "comp-5",
    name: "Aura Creative Tech",
    logoColor: "#8b5cf6",
    logoInitials: "AC",
    industry: "Design & UX SaaS",
    location: "Pune, India",
    employees: "150 - 300",
    rating: "4.9",
    openRoles: 1,
    website: "https://auratech.example.com",
    about: "Aura delivers design system automation tools helping product engineering teams build coherent digital design languages."
  },
  {
    id: "comp-6",
    name: "DataSphere AI",
    logoColor: "#ec4899",
    logoInitials: "DS",
    industry: "Artificial Intelligence",
    location: "Delhi NCR, India",
    employees: "80 - 150",
    rating: "4.7",
    openRoles: 1,
    website: "https://datasphere.example.com",
    about: "DataSphere AI develops real-time intelligent data ingestion and generative AI analytics engines for enterprise teams."
  }
];

// Storage keys
const STORAGE_KEYS = {
  JOBS: "portal_jobs_data",
  SAVED_JOBS: "portal_saved_job_ids",
  APPLICATIONS: "portal_job_applications",
  CANDIDATE_PROFILE: "portal_candidate_profile"
};

// Data Manager Interface
const DataManager = {
  // Retrieve all jobs (seed data merged with localStorage)
  getJobs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(SEED_JOBS));
        return SEED_JOBS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error reading jobs from localStorage:", e);
      return SEED_JOBS;
    }
  },

  // Save a new posted job
  saveJob(newJob) {
    const jobs = this.getJobs();
    const updated = [newJob, ...jobs];
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
    return newJob;
  },

  // Find job by ID
  getJobById(id) {
    const jobs = this.getJobs();
    return jobs.find(job => String(job.id) === String(id)) || null;
  },

  // Get Saved Jobs IDs
  getSavedJobIds() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  },

  // Toggle Save Job
  toggleSaveJob(jobId) {
    const id = String(jobId);
    let savedIds = this.getSavedJobIds();
    let isNowSaved = false;

    if (savedIds.includes(id)) {
      savedIds = savedIds.filter(item => item !== id);
      isNowSaved = false;
    } else {
      savedIds.push(id);
      isNowSaved = true;
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedIds));
    // Trigger custom event so navbar count updates across listeners
    window.dispatchEvent(new CustomEvent("savedJobsChanged", { detail: { count: savedIds.length } }));
    return isNowSaved;
  },

  isJobSaved(jobId) {
    const savedIds = this.getSavedJobIds();
    return savedIds.includes(String(jobId));
  },

  // Get full objects of saved jobs
  getSavedJobs() {
    const savedIds = this.getSavedJobIds();
    const allJobs = this.getJobs();
    return allJobs.filter(job => savedIds.includes(String(job.id)));
  },

  // Applications
  getApplications() {
    try {
      const apps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return apps ? JSON.parse(apps) : [];
    } catch (e) {
      return [];
    }
  },

  saveApplication(application) {
    const apps = this.getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      appliedAt: new Date().toISOString(),
      status: "Submitted",
      ...application
    };
    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return newApp;
  },

  // Companies
  getCompanies() {
    return SEED_COMPANIES;
  },

  // Candidate Profile
  getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CANDIDATE_PROFILE);
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    // Default profile
    return {
      fullName: "Mohd Samit",
      email: "samit.dev@example.com",
      phone: "+91 98765 43210",
      headline: "Aspiring Cloud & Full Stack Web Developer",
      location: "Bengaluru, India",
      experience: "Entry",
      skills: ["HTML5", "CSS3", "JavaScript", "AWS Cloud", "Git & GitHub"],
      bio: "Passionate developer building responsive web applications and cloud infrastructure.",
      resumeName: "Mohd_Samit_Resume.pdf",
      resumeUploadDate: "2026-11-06"
    };
  },

  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_PROFILE, JSON.stringify(profileData));
  }
};
