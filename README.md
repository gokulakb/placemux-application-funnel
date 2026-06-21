# Application Funnel

## Overview

This project implements the Application Funnel module for company. The system allows students to apply for jobs, companies to view applications, shortlist candidates, and monitor application statistics through dashboard metrics.

The application is built using Node.js, Express.js, and SQLite and demonstrates an end-to-end recruitment workflow.

---

## Features

### Student Features

* Apply for jobs
* Prevent duplicate applications for the same job

### Company Features

* View all applications for a job
* Filter applications by status
* Shortlist candidates
* View shortlisted candidates
* Monitor application statistics through a dashboard

---

## Tech Stack

* Node.js
* Express.js
* SQLite
* REST APIs
* UUID

---

## Project Structure

placemux-application-funnel/
├── server.js
├── createDatabase.js
├── package.json
├── README.md
├── database/
│ └── placemux.db
├── routes/
│ └── applicationRoutes.js
├── controllers/
│ └── applicationController.js
└── services/
└── applicationService.js

---

## API Endpoints

### Apply for Job

POST /api/apply

Request Body:

{
"student_name": "Amrutha",
"student_email": "[ammu96@gmail.com](mailto:ammu96@gmail.com)",
"job_id": "job1"
}

---

### View Applications

GET /api/applications/job1

---

### Filter Applications by Status

GET /api/applications/job1?status=Applied

GET /api/applications/job1?status=Shortlisted

---

### Shortlist Candidate

PUT /api/shortlist/:id

---

### View Shortlisted Candidates

GET /api/shortlisted

---

### Dashboard Metrics

GET /api/dashboard

Sample Response:

{
"totalApplications": 5,
"shortlisted": 2,
"pending": 3
}

---

## Demo Flow

Student Applies
↓
Duplicate Check
↓
Application Stored
↓
Company Views Applications
↓
Status Filtering
↓
Candidate Shortlisting
↓
Dashboard Statistics

---

## How to Run

Install dependencies:

npm install

Start the server:

npm start

Server URL:

http://localhost:10000

---

## Outcome

The project demonstrates a complete application funnel where students can apply for jobs and companies can manage applications and shortlisting through a simple recruitment workflow.
