/**
 * Job Details Page Logic:
 * - Reads Job ID from query parameters
 * - Renders complete job specifications, responsibilities, requirements, and benefits
 * - Connects Apply button and Save Job toggle
 * - Displays related jobs
 */

document.addEventListener("DOMContentLoaded", () => {
  initJobDetailsPage();
});

function initJobDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id");

  const container = document.getElementById("job-details-view");
  if (!container) return;

  if (!jobId) {
    renderNotFound(container, "No Job Selected", "Please select a job from our listings page to view its details.");
    return;
  }

  const job = DataManager.getJobById(jobId);
  if (!job) {
    renderNotFound(container, "Job Not Found", "The job posting you are looking for may have been closed or expired.");
    return;
  }

  // Update page title
  document.title = `${job.title} at ${job.company} - Job Portal`;

  const isSaved = DataManager.isJobSaved(job.id);

  // Type Pill class
  let typePillClass = "pill-blue";
  if (job.type === "Remote") typePillClass = "pill-green";
  else if (job.type === "Internship") typePillClass = "pill-amber";
  else if (job.type === "Part-time") typePillClass = "pill-purple";

  // Responsibilities & Requirements lists
  const respList = (job.responsibilities || [
    "Design and implement responsive features according to requirements.",
    "Work collaboratively with cross-functional team members.",
    "Deliver clean, well-tested and documented code."
  ]).map(item => `<li>${item}</li>`).join("");

  const reqList = (job.requirements || [
    "Relevant background and practical experience with modern web tools.",
    "Strong problem-solving attitude and attention to detail.",
    "Good written and verbal communication skills."
  ]).map(item => `<li>${item}</li>`).join("");

  const benList = (job.benefits || [
    "Competitive compensation and performance bonuses.",
    "Health insurance and medical benefits.",
    "Modern workstation and flexible work hours."
  ]).map(item => `<li>${item}</li>`).join("");

  const tagsHTML = (job.tags || []).map(t => `<span class="job-tag">${t}</span>`).join("");

  container.innerHTML = `
    <!-- Top Job Header Card -->
    <div class="job-detail-header">
      <div class="job-detail-top">
        <div class="job-detail-company-wrap">
          ${getCompanyLogoHTML(job.company, { size: 64, color: job.logoColor, initials: job.logoInitials })}
          <div>
            <h1 class="job-detail-title">${job.title}</h1>
            <p class="company-name" style="font-size: 1.05rem;">
              <a href="companies.html" style="color: var(--primary); font-weight: 600;">${job.company}</a>
              <span style="color: var(--text-light); margin: 0 0.5rem;">•</span>
              <span>${job.location}</span>
            </p>
            <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span class="pill ${typePillClass}">${job.type}</span>
              <span class="pill pill-gray">${job.experience} Level</span>
              <span class="pill pill-green">${job.salary}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <button id="detail-save-btn" class="save-job-btn ${isSaved ? 'saved' : ''}" style="width: 46px; height: 46px;" title="${isSaved ? 'Remove from saved' : 'Save job'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <a href="apply.html?jobId=${job.id}" class="btn btn-primary btn-lg">Apply for this Job</a>
        </div>
      </div>
    </div>

    <!-- Main Two Column Layout -->
    <div class="detail-layout">
      <!-- Left Column: Full Job Description -->
      <div class="detail-content-card">
        <div class="detail-section">
          <h3>Role Overview</h3>
          <p style="color: var(--text-main); font-size: 1rem; line-height: 1.7;">
            ${job.overview || "We are seeking a talented and passionate individual to join our growing engineering team. In this role, you will help design, develop, and scale high-impact solutions."}
          </p>
        </div>

        <div class="detail-section">
          <h3>Key Responsibilities</h3>
          <ul>${respList}</ul>
        </div>

        <div class="detail-section">
          <h3>Required Skills & Qualifications</h3>
          <ul>${reqList}</ul>
        </div>

        <div class="detail-section">
          <h3>Benefits & Perks</h3>
          <ul>${benList}</ul>
        </div>

        <div class="detail-section">
          <h3>Required Tech Stack</h3>
          <div class="job-tags" style="margin-top: 0.75rem;">
            ${tagsHTML}
          </div>
        </div>

        <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-weight: 700; color: var(--secondary);">Ready to take the next step?</h4>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Applications are reviewed on a rolling basis.</p>
          </div>
          <a href="apply.html?jobId=${job.id}" class="btn btn-primary">Apply Now</a>
        </div>
      </div>

      <!-- Right Column: Sidebar Specs -->
      <aside>
        <div class="detail-sidebar-card">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: var(--secondary);">Job Summary</h3>
          <div class="info-list-item">
            <span class="info-list-label">Job Type</span>
            <span class="info-list-value">${job.type}</span>
          </div>
          <div class="info-list-item">
            <span class="info-list-label">Experience Level</span>
            <span class="info-list-value">${job.experience}</span>
          </div>
          <div class="info-list-item">
            <span class="info-list-label">Location</span>
            <span class="info-list-value">${job.location}</span>
          </div>
          <div class="info-list-item">
            <span class="info-list-label">Offered Salary</span>
            <span class="info-list-value">${job.salary}</span>
          </div>
          <div class="info-list-item">
            <span class="info-list-label">Posted Date</span>
            <span class="info-list-value">${job.postedDate || 'Recent'}</span>
          </div>
        </div>

        <div class="detail-sidebar-card">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--secondary);">About Company</h3>
          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
            ${job.company} is an active employer hiring on our portal.
          </p>
          <a href="companies.html" class="btn btn-secondary btn-full btn-sm">Explore Company Profile</a>
        </div>
      </aside>
    </div>
  `;

  // Save toggle event
  const saveBtn = document.getElementById("detail-save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const isNowSaved = DataManager.toggleSaveJob(job.id);
      const svg = saveBtn.querySelector("svg");
      if (isNowSaved) {
        saveBtn.classList.add("saved");
        saveBtn.setAttribute("title", "Remove from saved");
        if (svg) svg.setAttribute("fill", "currentColor");
        showToast("Job saved to your bookmarks!", "success");
      } else {
        saveBtn.classList.remove("saved");
        saveBtn.setAttribute("title", "Save job");
        if (svg) svg.setAttribute("fill", "none");
        showToast("Job removed from bookmarks", "info");
      }
    });
  }
}

function renderNotFound(container, title, msg) {
  container.innerHTML = `
    <div class="empty-state" style="margin: 3rem 0;">
      <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3 class="empty-state-title">${title}</h3>
      <p class="empty-state-text">${msg}</p>
      <a href="jobs.html" class="btn btn-primary">Browse All Jobs</a>
    </div>
  `;
}
