/**
 * Candidate Profile Logic:
 * - Displays Candidate information and editable profile form
 * - Manages and renders Saved/Bookmarked jobs (with direct unsave capability)
 * - Displays submitted job applications history
 * - Interactive tab switching
 */

document.addEventListener("DOMContentLoaded", () => {
  initProfilePage();
});

function initProfilePage() {
  const profile = DataManager.getProfile();
  renderProfileHeader(profile);
  initTabs();
  renderSavedJobs();
  renderApplications();
  initProfileEditForm(profile);

  // Re-render when saved jobs change
  window.addEventListener("savedJobsChanged", () => {
    renderSavedJobs();
  });
}

function renderProfileHeader(profile) {
  const nameEl = document.getElementById("profile-header-name");
  const headlineEl = document.getElementById("profile-header-headline");
  const avatarEl = document.getElementById("profile-header-avatar");
  const metaEl = document.getElementById("profile-header-meta");

  if (nameEl) nameEl.textContent = profile.fullName;
  if (headlineEl) headlineEl.textContent = profile.headline;
  if (avatarEl) {
    avatarEl.textContent = profile.fullName.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "CD";
  }
  if (metaEl) {
    metaEl.innerHTML = `
      <span>📍 ${profile.location}</span>
      <span style="color: var(--text-light);">•</span>
      <span>📧 ${profile.email}</span>
      <span style="color: var(--text-light);">•</span>
      <span>📱 ${profile.phone}</span>
    `;
  }
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".profile-tab-btn");
  const tabPanes = document.querySelectorAll(".profile-tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.style.display = "none");

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.style.display = "block";
    });
  });
}

function renderSavedJobs() {
  const container = document.getElementById("saved-jobs-container");
  const countEl = document.getElementById("saved-jobs-count-text");
  if (!container) return;

  const savedJobs = DataManager.getSavedJobs();
  if (countEl) countEl.textContent = `(${savedJobs.length})`;

  if (savedJobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <h3 class="empty-state-title">No Saved Jobs Yet</h3>
        <p class="empty-state-text">Browse our open positions and click the bookmark icon to save jobs you are interested in.</p>
        <a href="jobs.html" class="btn btn-primary btn-sm">Explore Job Listings</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="job-grid">
      ${savedJobs.map(job => createJobCardHTML(job)).join("")}
    </div>
  `;
}

function renderApplications() {
  const container = document.getElementById("applications-container");
  if (!container) return;

  const applications = DataManager.getApplications();

  if (applications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <h3 class="empty-state-title">No Applications Submitted</h3>
        <p class="empty-state-text">You haven't submitted any job applications yet. Find an opening that matches your profile and apply with your verified PDF resume.</p>
        <a href="jobs.html" class="btn btn-primary btn-sm">Find Jobs to Apply</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${applications.map(app => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 0.2rem;">${app.jobTitle}</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted);">${app.company} • Applied on ${new Date(app.appliedAt).toLocaleDateString()}</p>
            <div style="margin-top: 0.4rem; font-size: 0.82rem; color: var(--primary);">
              📄 <strong>Resume:</strong> ${app.resumeFileName} (${app.resumeFileSize})
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="pill pill-green">${app.status || 'Under Review'}</span>
            <a href="job-details.html?id=${app.jobId}" class="btn btn-secondary btn-sm">View Position</a>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function initProfileEditForm(profile) {
  const form = document.getElementById("profile-edit-form");
  if (!form) return;

  // Populate inputs
  document.getElementById("edit-fullname").value = profile.fullName || "";
  document.getElementById("edit-email").value = profile.email || "";
  document.getElementById("edit-phone").value = profile.phone || "";
  document.getElementById("edit-headline").value = profile.headline || "";
  document.getElementById("edit-location").value = profile.location || "";
  document.getElementById("edit-bio").value = profile.bio || "";
  document.getElementById("edit-skills").value = (profile.skills || []).join(", ");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updated = {
      fullName: document.getElementById("edit-fullname").value.trim(),
      email: document.getElementById("edit-email").value.trim(),
      phone: document.getElementById("edit-phone").value.trim(),
      headline: document.getElementById("edit-headline").value.trim(),
      location: document.getElementById("edit-location").value.trim(),
      bio: document.getElementById("edit-bio").value.trim(),
      skills: document.getElementById("edit-skills").value.split(",").map(s => s.trim()).filter(Boolean),
      resumeName: profile.resumeName || "Resume.pdf"
    };

    DataManager.saveProfile(updated);
    renderProfileHeader(updated);
    showToast("Profile updated successfully!", "success");
  });
}
