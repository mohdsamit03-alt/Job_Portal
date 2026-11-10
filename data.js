/**
 * Job Portal - Seed Data & LocalStorage Management
 * Handles persistent storage for Jobs, Saved Jobs, Applications, and Companies.
 */

// FAANG & Ecosystem Company Brand Registry with Vector Icons
const COMPANY_BRAND_MAP = {
  "cloudscale systems": {
    name: "CloudScale Systems",
    bg: "linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #6366f1 100%)",
    initials: "CS",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      <path d="M12 13v6"></path>
      <path d="m9 16 3-3 3 3"></path>
    </svg>`
  },
  "nexus fintech": {
    name: "Nexus FinTech",
    bg: "linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)",
    initials: "NF",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>`
  },
  "innovatex digital": {
    name: "InnovateX Digital",
    bg: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
    initials: "IX",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <line x1="14" y1="4" x2="10" y2="20"></line>
    </svg>`
  },
  "pixelcraft studios": {
    name: "PixelCraft Studios",
    bg: "linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)",
    initials: "PC",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="m2 2 7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>`
  },
  "aura creative tech": {
    name: "Aura Creative Tech",
    bg: "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #8b5cf6 100%)",
    initials: "AC",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="2" x2="12" y2="4"></line>
      <line x1="12" y1="20" x2="12" y2="22"></line>
      <line x1="2" y1="12" x2="4" y2="12"></line>
      <line x1="20" y1="12" x2="22" y2="12"></line>
    </svg>`
  },
  "datasphere ai": {
    name: "DataSphere AI",
    bg: "linear-gradient(135deg, #9d174d 0%, #db2777 50%, #ec4899 100%)",
    initials: "DS",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <circle cx="5" cy="6" r="2"></circle>
      <circle cx="19" cy="6" r="2"></circle>
      <circle cx="5" cy="18" r="2"></circle>
      <circle cx="19" cy="18" r="2"></circle>
      <line x1="7" y1="7" x2="10" y2="10.5"></line>
      <line x1="17" y1="7" x2="14" y2="10.5"></line>
      <line x1="7" y1="17" x2="10" y2="13.5"></line>
      <line x1="17" y1="17" x2="14" y2="13.5"></line>
    </svg>`
  },
  // FAANG & Top Tech Brands
  "apple": {
    name: "Apple",
    bg: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
    initials: "AP",
    svg: `<svg viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.54-7.66-11.56-13.84-5.66-8.7-10.05-18.42-13.17-29.17-3.12-10.74-4.68-21.05-4.68-29.93 0-13.79 3.5-25.13 10.51-34.02 7.01-8.89 15.86-13.41 26.54-13.56 5.42 0 11.22 1.39 17.42 4.17 6.2 2.78 10.15 4.22 11.85 4.31 1.48-.13 5.56-1.61 12.24-4.44 6.69-2.83 12.38-4.08 17.07-3.76 12.73.91 22.84 5.87 30.34 14.88-11.05 6.74-16.48 16.09-16.29 28.05.22 9.46 3.84 17.39 10.87 23.78 7.03 6.39 15.34 10.14 24.93 11.26-2.17 6.52-4.78 13.04-7.84 19.56zM119.22 31.84c0-7.74 2.78-14.89 8.35-21.46 5.57-6.57 12.3-10.38 20.2-11.44.22 1.09.33 2.17.33 3.26 0 7.61-2.93 15-8.8 22.17-5.87 7.17-13.04 11.08-21.52 11.74-.22-1.41-.33-2.61-.33-3.61z"/>
    </svg>`
  },
  "google": {
    name: "Google",
    bg: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    initials: "GG",
    svg: `<svg viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>`
  },
  "amazon": {
    name: "Amazon",
    bg: "linear-gradient(135deg, #0f172a 0%, #232f3e 100%)",
    initials: "AM",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 17c3.5 2.5 8.5 3.5 13 1"></path>
      <path d="M14 17l4 1-2-3.5"></path>
      <circle cx="8" cy="8" r="4"></circle>
    </svg>`
  },
  "aws": {
    name: "AWS",
    bg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    initials: "AWS",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      <polyline points="12 12 15 15 12 18"></polyline>
    </svg>`
  },
  "meta": {
    name: "Meta",
    bg: "linear-gradient(135deg, #0064e0 0%, #0081fb 100%)",
    initials: "MT",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12c-2-3-4-5-7-5a5 5 0 0 0 0 10c3 0 5-2 7-5 2 3 4 5 7 5a5 5 0 0 0 0-10c-3 0-5 2-7 5Z"></path>
    </svg>`
  },
  "netflix": {
    name: "Netflix",
    bg: "linear-gradient(135deg, #141414 0%, #000000 100%)",
    initials: "NF",
    svg: `<svg viewBox="0 0 24 24" fill="#e50914">
      <path d="M4 2v20l4-2V2H4zm8 0v20l4-2V2h-4zm-4 4.5L16 22V2L8 6.5z"/>
    </svg>`
  },
  "microsoft": {
    name: "Microsoft",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    initials: "MS",
    svg: `<svg viewBox="0 0 24 24">
      <rect x="2" y="2" width="9" height="9" fill="#f25022"/>
      <rect x="13" y="2" width="9" height="9" fill="#7fba00"/>
      <rect x="2" y="13" width="9" height="9" fill="#00a4ef"/>
      <rect x="13" y="13" width="9" height="9" fill="#ffb900"/>
    </svg>`
  }
};

/**
 * Universal Company Logo Component Generator
 * Renders verified SVGs for companies across Home, Jobs Portal, Company Directory, and Job Details
 */
function getCompanyLogoHTML(companyName = "", options = {}) {
  const nameClean = (companyName || "").toLowerCase().trim();
  const brand = COMPANY_BRAND_MAP[nameClean];
  const size = options.size || 52;
  const customClass = options.className || "";

  if (brand) {
    return `
      <div class="company-logo ${customClass}" 
           style="background: ${brand.bg}; width: ${size}px; height: ${size}px;" 
           title="${brand.name}" 
           aria-label="${brand.name} Logo">
        ${brand.svg}
      </div>
    `;
  }

  // Fallback for custom user-posted companies
  const bg = options.color || "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
  const initials = options.initials || (companyName ? companyName.substring(0, 2).toUpperCase() : "JB");

  return `
    <div class="company-logo ${customClass}" 
         style="background: ${bg}; width: ${size}px; height: ${size}px;" 
         title="${companyName || 'Company'}"
         aria-label="${companyName || 'Company'}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 50%; height: 50%;">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    </div>
  `;
}

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
      if (stored) {
        const parsed = JSON.parse(stored);
        // Automatic seamless migration from legacy headline
        if (!parsed.headline || parsed.headline.includes("Aspiring Cloud")) {
          parsed.headline = "AI Systems Engineer | Distributed Architecture & Large-Scale Systems";
          parsed.skills = [
            "AI Systems Design",
            "Distributed Systems",
            "Generative AI & LLMs",
            "Python / PyTorch",
            "AWS Cloud Infrastructure",
            "FastAPI & Microservices",
            "Docker & Kubernetes",
            "High-Throughput APIs"
          ];
          parsed.bio = "AI Systems Engineer specialized in architecting large-scale distributed architectures, high-throughput microservices, and production GenAI pipelines.";
          parsed.resumeName = "Mohd_Samit_AI_Systems_Engineer_Resume.pdf";
          localStorage.setItem(STORAGE_KEYS.CANDIDATE_PROFILE, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {}

    // Default profile
    return {
      fullName: "Mohd Samit",
      email: "samit.dev@example.com",
      phone: "+91 98765 43210",
      headline: "AI Systems Engineer | Distributed Architecture & Large-Scale Systems",
      location: "Bengaluru, India",
      experience: "Mid",
      skills: [
        "AI Systems Design",
        "Distributed Systems",
        "Generative AI & LLMs",
        "Python / PyTorch",
        "AWS Cloud Infrastructure",
        "FastAPI & Microservices",
        "Docker & Kubernetes",
        "High-Throughput APIs"
      ],
      bio: "AI Systems Engineer specialized in architecting large-scale distributed architectures, high-throughput microservices, and production GenAI pipelines.",
      resumeName: "Mohd_Samit_AI_Systems_Engineer_Resume.pdf",
      resumeUploadDate: "2026-11-08"
    };
  },

  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_PROFILE, JSON.stringify(profileData));
  }
};
