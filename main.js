/**
 * Global JavaScript: Navigation, Saved Badge Counter, Toast System, and Shared Renderers
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateSavedBadge();

  // Listen for storage changes or custom events to keep badge synced
  window.addEventListener("savedJobsChanged", (e) => {
    updateSavedBadge(e.detail?.count);
  });
  window.addEventListener("storage", () => {
    updateSavedBadge();
  });
});

/**
 * Mobile Navigation Toggle and Active Page Link Highlighting
 */
function initNavbar() {
  const toggleBtn = document.querySelector(".nav-toggle-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("show");
      }
    });
  }

  // Highlight current page
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Update the Saved Jobs count badge in the header
 */
function updateSavedBadge(explicitCount) {
  const badge = document.querySelector(".badge-count");
  if (!badge) return;

  const count = typeof explicitCount === "number" ? explicitCount : DataManager.getSavedJobIds().length;
  badge.textContent = count;
}

/**
 * Toast Notification System
 * @param {string} message - Notification text
 * @param {'success'|'danger'|'info'} type - Toast type
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  // Icon based on type
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'danger') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Common Job Card HTML Generator
 */
function createJobCardHTML(job) {
  const isSaved = DataManager.isJobSaved(job.id);

  // Type Pill class
  let typePillClass = "pill-blue";
  if (job.type === "Remote") typePillClass = "pill-green";
  else if (job.type === "Internship") typePillClass = "pill-amber";
  else if (job.type === "Part-time") typePillClass = "pill-purple";

  // Experience Pill class
  let expPillClass = "pill-gray";
  if (job.experience === "Senior") expPillClass = "pill-purple";
  else if (job.experience === "Entry") expPillClass = "pill-green";

  // Tags HTML
  const tagsHTML = (job.tags || []).slice(0, 3).map(tag => `<span class="job-tag">${tag}</span>`).join("");

  return `
    <article class="job-card" data-job-id="${job.id}">
      <div class="job-card-header">
        <div class="company-logo" style="background-color: ${job.logoColor || '#2563eb'};">
          ${job.logoInitials || job.company.substring(0, 2).toUpperCase()}
        </div>
        <div class="job-title-group">
          <h3 class="job-title"><a href="job-details.html?id=${job.id}">${job.title}</a></h3>
          <p class="company-name">${job.company}</p>
        </div>
        <button class="save-job-btn ${isSaved ? 'saved' : ''}" 
                onclick="handleCardSaveToggle('${job.id}', this)" 
                title="${isSaved ? 'Remove from saved' : 'Save job'}"
                aria-label="Save Job">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      <div class="job-card-pills">
        <span class="pill ${typePillClass}">${job.type}</span>
        <span class="pill ${expPillClass}">${job.experience} Level</span>
      </div>

      <div class="job-card-meta">
        <div class="job-card-meta-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${job.location}</span>
        </div>
        <div class="job-card-meta-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>${job.salary}</span>
        </div>
      </div>

      <div class="job-tags">
        ${tagsHTML}
      </div>

      <div class="job-card-footer">
        <a href="job-details.html?id=${job.id}" class="btn btn-secondary btn-sm">View Details</a>
        <a href="apply.html?jobId=${job.id}" class="btn btn-primary btn-sm">Apply Now</a>
      </div>
    </article>
  `;
}

/**
 * Global Save Toggle handler for Job Cards
 */
function handleCardSaveToggle(jobId, buttonElement) {
  const isNowSaved = DataManager.toggleSaveJob(jobId);
  const svg = buttonElement.querySelector("svg");

  if (isNowSaved) {
    buttonElement.classList.add("saved");
    buttonElement.setAttribute("title", "Remove from saved");
    if (svg) svg.setAttribute("fill", "currentColor");
    showToast("Job saved to your bookmarks!", "success");
  } else {
    buttonElement.classList.remove("saved");
    buttonElement.setAttribute("title", "Save job");
    if (svg) svg.setAttribute("fill", "none");
    showToast("Job removed from bookmarks", "info");
  }
}
