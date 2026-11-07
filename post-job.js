/**
 * Post a Job Logic:
 * - Form validation
 * - Handles creation of new job post
 * - Saves into LocalStorage using DataManager
 * - Redirects to Job Listings where it immediately appears at the top
 */

document.addEventListener("DOMContentLoaded", () => {
  initPostJobForm();
});

function initPostJobForm() {
  const form = document.getElementById("post-job-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect values
    const title = document.getElementById("job-title")?.value.trim();
    const company = document.getElementById("company-name")?.value.trim();
    const location = document.getElementById("job-location")?.value.trim();
    const type = document.getElementById("job-type")?.value;
    const experience = document.getElementById("job-experience")?.value;
    const salary = document.getElementById("job-salary")?.value.trim() || "Competitive / Disclosed on Interview";
    const tagsRaw = document.getElementById("job-tags")?.value.trim();
    const overview = document.getElementById("job-overview")?.value.trim();
    const responsibilitiesRaw = document.getElementById("job-responsibilities")?.value.trim();
    const requirementsRaw = document.getElementById("job-requirements")?.value.trim();
    const benefitsRaw = document.getElementById("job-benefits")?.value.trim();

    // Validation
    if (!title || !company || !location || !type || !experience || !overview) {
      showToast("Please fill in all required fields", "danger");
      return;
    }

    // Process tags
    const tags = tagsRaw 
      ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean)
      : ["Software", "Development"];

    // Process multiline fields into arrays
    const responsibilities = responsibilitiesRaw 
      ? responsibilitiesRaw.split("\n").map(l => l.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
      : [
          "Develop high-quality features meeting project requirements.",
          "Collaborate with team members to deliver scalable solutions."
        ];

    const requirements = requirementsRaw
      ? requirementsRaw.split("\n").map(l => l.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
      : [
          "Demonstrated practical knowledge in the relevant domain.",
          "Good problem-solving attitude and team collaboration."
        ];

    const benefits = benefitsRaw
      ? benefitsRaw.split("\n").map(l => l.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
      : [
          "Competitive salary and performance bonuses.",
          "Flexible work arrangements."
        ];

    // Pick random badge color
    const brandColors = ["#2563eb", "#4f46e5", "#0284c7", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];
    const randomColor = brandColors[Math.floor(Math.random() * brandColors.length)];
    const initials = company.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "JB";

    const newJob = {
      id: "job-" + Date.now(),
      title,
      company,
      logoColor: randomColor,
      logoInitials: initials,
      location,
      type,
      experience,
      salary,
      postedDate: new Date().toISOString().split("T")[0],
      featured: true,
      tags,
      overview,
      responsibilities,
      requirements,
      benefits
    };

    // Save job dynamically
    DataManager.saveJob(newJob);

    // Disable button to prevent double submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Publishing Job...";
    }

    showToast("🎉 Job posted successfully! Redirecting to listings...", "success");

    // Redirect to listings page after 1.2s to show it at the top
    setTimeout(() => {
      window.location.href = `jobs.html?keyword=${encodeURIComponent(title)}`;
    }, 1200);
  });
}
