# MSE 2 Practical - Job Portal (Advanced)

## Overview
A comprehensive Job Portal web application meeting all requirements for the MSE 2 Practical exam.

## Requirements Breakdown

### 1. Pages / Views
- **Home**: Landing page with hero banner, quick search, featured jobs, and top companies.
- **Job Listings**: Full browseable list of available jobs with search and filter controls.
- **Job Details**: Detailed view of a selected job (role, company info, requirements, salary, apply button).
- **Post a Job**: Form for employers to submit new job postings.
- **Apply**: Application form for job seekers with resume upload validation.
- **Companies**: Directory of hiring companies with profiles and active openings.
- **Candidate Profile**: Profile page showing user details, uploaded resume info, and saved jobs.

### 2. Core Functional Requirements
- **Search**: By keyword (title/role) and location.
- **Filters**: By job type (Full-time, Part-time, Remote, Internship) and experience level (Entry, Mid, Senior).
- **Save Jobs**: Bookmark/save jobs with persistent storage (localStorage) accessible from the Candidate Profile.
- **Resume File-type Check**: Application form strictly validates that uploaded resumes are **PDF only** (`.pdf` extension & `application/pdf` MIME type) with clear error messaging.
- **Dynamic Postings**: Jobs submitted through the "Post a Job" form immediately appear in the Job Listings without page reload or database dependency (stored in state/localStorage).
