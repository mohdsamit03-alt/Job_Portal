/**
 * Job Listings Page Logic:
 * - Real-time Search by Keyword (title, company, tags)
 * - Real-time Search by Location
 * - Multi-criteria Filtering by Job Type & Experience Level
 * - Sorting by Newest / Relevance
 * - Integration with LocalStorage (all posted jobs dynamically show up)
 */

document.addEventListener("DOMContentLoaded", () => {
  initJobsPage();
});

function initJobsPage() {
  const jobsContainer = document.getElementById("jobs-list-container");
  const jobCountEl = document.getElementById("jobs-count");
  if (!jobsContainer) return;

  // Search input elements
  const searchInput = document.getElementById("filter-keyword");
  const locationInput = document.getElementById("filter-location");
  const sortSelect = document.getElementById("filter-sort");
  const resetBtn = document.getElementById("btn-reset-filters");

  // Read URL query parameters if navigated from Home page
  const urlParams = new URLSearchParams(window.location.search);
  const initialKeyword = urlParams.get("keyword") || "";
  const initialLocation = urlParams.get("location") || "";
  const initialType = urlParams.get("type") || "";

  if (searchInput && initialKeyword) searchInput.value = initialKeyword;
  if (locationInput && initialLocation) locationInput.value = initialLocation;

  if (initialType) {
    const matchingCheckbox = document.querySelector(`input[name="job-type"][value="${initialType}"]`);
    if (matchingCheckbox) matchingCheckbox.checked = true;
  }

  // Render function with filters
  function filterAndRenderJobs() {
    const allJobs = DataManager.getJobs();
    const keyword = (searchInput?.value || "").toLowerCase().trim();
    const location = (locationInput?.value || "").toLowerCase().trim();

    // Selected job types (checkboxes)
    const selectedTypes = Array.from(
      document.querySelectorAll('input[name="job-type"]:checked')
    ).map(cb => cb.value);

    // Selected experience levels (checkboxes)
    const selectedExp = Array.from(
      document.querySelectorAll('input[name="experience"]:checked')
    ).map(cb => cb.value);

    // Filter pipeline
    const filtered = allJobs.filter(job => {
      // 1. Keyword match (Title, Company, Tags, Overview)
      const matchesKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(keyword))) ||
        (job.overview && job.overview.toLowerCase().includes(keyword));

      // 2. Location match
      const matchesLocation = !location || 
        job.location.toLowerCase().includes(location);

      // 3. Job Type match
      const matchesType = selectedTypes.length === 0 || 
        selectedTypes.includes(job.type);

      // 4. Experience match
      const matchesExp = selectedExp.length === 0 || 
        selectedExp.includes(job.experience);

      return matchesKeyword && matchesLocation && matchesType && matchesExp;
    });

    // Sorting
    const sortValue = sortSelect?.value || "newest";
    if (sortValue === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate || 0) - new Date(a.postedDate || 0));
    }

    // Update job count display
    if (jobCountEl) {
      jobCountEl.textContent = `${filtered.length} Job${filtered.length === 1 ? '' : 's'} Found`;
    }

    // Render results
    if (filtered.length === 0) {
      jobsContainer.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3 class="empty-state-title">No Matching Jobs Found</h3>
          <p class="empty-state-text">Try adjusting your keyword, location, or clearing some of the filters to see more opportunities.</p>
          <button id="empty-clear-btn" class="btn btn-secondary btn-sm">Clear All Filters</button>
        </div>
      `;
      document.getElementById("empty-clear-btn")?.addEventListener("click", resetAllFilters);
    } else {
      jobsContainer.innerHTML = filtered.map(job => createJobCardHTML(job)).join("");
    }
  }

  function resetAllFilters() {
    if (searchInput) searchInput.value = "";
    if (locationInput) locationInput.value = "";
    if (sortSelect) sortSelect.value = "newest";

    document.querySelectorAll('input[name="job-type"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="experience"]').forEach(cb => cb.checked = false);

    filterAndRenderJobs();
    showToast("Filters reset", "info");
  }

  // Event Listeners for real-time interactivity
  searchInput?.addEventListener("input", filterAndRenderJobs);
  locationInput?.addEventListener("input", filterAndRenderJobs);
  sortSelect?.addEventListener("change", filterAndRenderJobs);
  resetBtn?.addEventListener("click", resetAllFilters);

  document.querySelectorAll('input[name="job-type"], input[name="experience"]').forEach(input => {
    input.addEventListener("change", filterAndRenderJobs);
  });

  // Initial trigger
  filterAndRenderJobs();
}
