/**
 * Companies Directory Logic:
 * - Search companies by name or industry
 * - Calculates open job count dynamically from active jobs
 * - Direct link to view filtered jobs by company
 */

document.addEventListener("DOMContentLoaded", () => {
  initCompaniesPage();
});

function initCompaniesPage() {
  const container = document.getElementById("companies-grid");
  const searchInput = document.getElementById("company-search-input");
  const industryFilter = document.getElementById("company-industry-filter");
  if (!container) return;

  const companies = DataManager.getCompanies();
  const allJobs = DataManager.getJobs();

  // Populate industry dropdown options
  if (industryFilter) {
    const industries = Array.from(new Set(companies.map(c => c.industry)));
    industries.forEach(ind => {
      const opt = document.createElement("option");
      opt.value = ind;
      opt.textContent = ind;
      industryFilter.appendChild(opt);
    });
  }

  function renderCompanies() {
    const query = (searchInput?.value || "").toLowerCase().trim();
    const selectedIndustry = industryFilter?.value || "";

    const filtered = companies.filter(company => {
      const matchesSearch = !query || 
        company.name.toLowerCase().includes(query) ||
        company.about.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query);

      const matchesInd = !selectedIndustry || company.industry === selectedIndustry;

      return matchesSearch && matchesInd;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3 class="empty-state-title">No Companies Found</h3>
          <p class="empty-state-text">Try searching with a different term or clear the industry filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(comp => {
      // Dynamically calculate actual open jobs matching this company name
      const openCount = allJobs.filter(j => j.company.toLowerCase() === comp.name.toLowerCase()).length;

      return `
        <div class="company-card">
          ${getCompanyLogoHTML(comp.name, { size: 68, color: comp.logoColor, initials: comp.logoInitials })}
          <h3 class="company-card-name">${comp.name}</h3>
          <p class="company-card-industry">
            <span class="pill pill-blue">${comp.industry}</span>
          </p>
          <div style="display: flex; gap: 1rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.85rem;">
            <span>⭐ <strong>${comp.rating}</strong> / 5.0</span>
            <span>👥 ${comp.employees} employees</span>
          </div>
          <p class="company-card-desc">${comp.about}</p>
          <div style="margin-top: auto; width: 100%; display: flex; gap: 0.5rem;">
            <a href="jobs.html?keyword=${encodeURIComponent(comp.name)}" class="btn btn-outline btn-sm btn-full">
              View Jobs (${openCount})
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  searchInput?.addEventListener("input", renderCompanies);
  industryFilter?.addEventListener("change", renderCompanies);

  renderCompanies();
}
