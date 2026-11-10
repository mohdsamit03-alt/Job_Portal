/**
 * Apply Form Logic:
 * - Strict Resume File-Type Validation (PDF Only)
 * - Drag-and-drop file upload support
 * - Dynamic job pre-selection via URL parameter ?jobId=...
 * - Saves application to LocalStorage and updates Candidate Profile
 */

document.addEventListener("DOMContentLoaded", () => {
  initApplyPage();
});

function initApplyPage() {
  const form = document.getElementById("job-application-form");
  const jobSelect = document.getElementById("apply-job-select");
  const jobBanner = document.getElementById("apply-job-banner");
  const fileInput = document.getElementById("resume-file-input");
  const dropzone = document.getElementById("resume-dropzone");
  const filePreview = document.getElementById("file-preview-box");
  const fileNameDisplay = document.getElementById("file-name-display");
  const fileSizeDisplay = document.getElementById("file-size-display");
  const fileRemoveBtn = document.getElementById("file-remove-btn");
  const fileErrorBox = document.getElementById("file-error-box");

  if (!form) return;

  // 1. Populate Jobs Dropdown & Check URL params
  const allJobs = DataManager.getJobs();
  const urlParams = new URLSearchParams(window.location.search);
  const selectedJobId = urlParams.get("jobId");

  if (jobSelect) {
    jobSelect.innerHTML = `<option value="">-- Choose an open position --</option>` +
      allJobs.map(j => `<option value="${j.id}" ${j.id === selectedJobId ? 'selected' : ''}>${j.title} (${j.company})</option>`).join("");

    jobSelect.addEventListener("change", () => {
      updateBanner(jobSelect.value);
    });
  }

  function updateBanner(jobId) {
    if (!jobBanner) return;
    const targetJob = DataManager.getJobById(jobId);
    if (targetJob) {
      jobBanner.style.display = "block";
      jobBanner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          ${getCompanyLogoHTML(targetJob.company, { size: 44, color: targetJob.logoColor, initials: targetJob.logoInitials })}
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--secondary);">${targetJob.title}</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${targetJob.company} • ${targetJob.location} • ${targetJob.salary}</p>
          </div>
        </div>
      `;
    } else {
      jobBanner.style.display = "none";
    }
  }

  if (selectedJobId) {
    updateBanner(selectedJobId);
  }

  // Pre-fill with candidate profile if available
  const profile = DataManager.getProfile();
  if (profile) {
    const nameInput = document.getElementById("applicant-name");
    const emailInput = document.getElementById("applicant-email");
    const phoneInput = document.getElementById("applicant-phone");
    if (nameInput && !nameInput.value) nameInput.value = profile.fullName || "";
    if (emailInput && !emailInput.value) emailInput.value = profile.email || "";
    if (phoneInput && !phoneInput.value) phoneInput.value = profile.phone || "";
  }

  // 2. Strict Resume PDF Validation Logic
  let attachedPdfFile = null;

  function validateAndSetFile(file) {
    if (!file) return;

    // Strict validation: Must have .pdf extension AND (application/pdf MIME or empty on some local OS)
    const fileName = file.name.toLowerCase();
    const isPdfExtension = fileName.endsWith(".pdf");
    const isPdfMime = file.type === "application/pdf" || file.type === "";

    if (!isPdfExtension || !isPdfMime) {
      // REJECT FILE
      attachedPdfFile = null;
      fileInput.value = "";
      filePreview.style.display = "none";
      fileErrorBox.style.display = "block";
      fileErrorBox.innerHTML = `
        ⚠️ <strong>Invalid File Format!</strong> You uploaded "<em>${file.name}</em>".<br>
        Only <strong>PDF documents (.pdf)</strong> are accepted. Please convert your file to PDF and try again.
      `;
      showToast("Only PDF documents (.pdf) are allowed!", "danger");
      return;
    }

    // Check size limit (5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      attachedPdfFile = null;
      fileInput.value = "";
      filePreview.style.display = "none";
      fileErrorBox.style.display = "block";
      fileErrorBox.innerHTML = `⚠️ <strong>File Too Large!</strong> Maximum file size allowed is 5MB.`;
      showToast("PDF file exceeds 5MB limit", "danger");
      return;
    }

    // ACCEPT FILE
    attachedPdfFile = file;
    fileErrorBox.style.display = "none";
    filePreview.style.display = "flex";
    fileNameDisplay.textContent = file.name;

    // Format size
    const sizeInKB = (file.size / 1024).toFixed(1);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    fileSizeDisplay.textContent = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;

    showToast("✅ PDF Resume verified and attached!", "success");
  }

  // File input change
  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  });

  // Remove button
  fileRemoveBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    attachedPdfFile = null;
    fileInput.value = "";
    filePreview.style.display = "none";
    fileErrorBox.style.display = "none";
    showToast("Resume removed", "info");
  });

  // Drag and drop handlers
  if (dropzone) {
    ["dragenter", "dragover"].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("dragover");
      });
    });

    ["dragleave", "drop"].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("dragover");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      validateAndSetFile(file);
    });
  }

  // 3. Form Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const jobId = jobSelect ? jobSelect.value : selectedJobId;
    const applicantName = document.getElementById("applicant-name")?.value.trim();
    const applicantEmail = document.getElementById("applicant-email")?.value.trim();
    const applicantPhone = document.getElementById("applicant-phone")?.value.trim();
    const applicantExp = document.getElementById("applicant-exp")?.value;
    const coverLetter = document.getElementById("cover-letter")?.value.trim();

    if (!jobId) {
      showToast("Please select a job position to apply for", "danger");
      return;
    }

    if (!applicantName || !applicantEmail || !applicantPhone) {
      showToast("Please fill in all required personal information", "danger");
      return;
    }

    // Strict check for PDF resume
    if (!attachedPdfFile) {
      fileErrorBox.style.display = "block";
      fileErrorBox.innerHTML = `⚠️ <strong>Resume Required!</strong> Please upload your resume in <strong>PDF format (.pdf)</strong> to proceed.`;
      showToast("Resume in PDF format is required", "danger");
      fileInput.focus();
      return;
    }

    const targetJob = DataManager.getJobById(jobId);

    // Save application to localStorage
    const newApplication = DataManager.saveApplication({
      jobId,
      jobTitle: targetJob ? targetJob.title : "Application",
      company: targetJob ? targetJob.company : "Company",
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantExp,
      coverLetter,
      resumeFileName: attachedPdfFile.name,
      resumeFileSize: (attachedPdfFile.size / 1024).toFixed(1) + " KB"
    });

    // Replace form with attractive success card
    const formCard = document.querySelector(".form-card");
    if (formCard) {
      formCard.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 72px; height: 72px; background: var(--success-bg); color: var(--success); border-radius: var(--radius-full); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 style="font-size: 2rem; font-weight: 800; color: var(--secondary); margin-bottom: 0.5rem;">Application Submitted!</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 520px; margin: 0 auto 1.5rem;">
            Thank you, <strong>${applicantName}</strong>. Your application for <strong>${targetJob?.title || 'the position'}</strong> at <strong>${targetJob?.company || 'the company'}</strong> has been securely received.
          </p>
          <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1.25rem; max-width: 440px; margin: 0 auto 2rem; text-align: left; font-size: 0.92rem;">
            <p><strong>Application Reference:</strong> ${newApplication.id}</p>
            <p><strong>Resume Uploaded:</strong> 📄 ${attachedPdfFile.name} (PDF Verified)</p>
            <p><strong>Confirmation sent to:</strong> ${applicantEmail}</p>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="profile.html" class="btn btn-secondary">View in Candidate Profile</a>
            <a href="jobs.html" class="btn btn-primary">Browse More Jobs</a>
          </div>
        </div>
      `;
    }

    showToast("Application submitted successfully!", "success");
  });
}
