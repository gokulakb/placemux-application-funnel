const router = require("express").Router();

const controller =
  require("../controllers/applicationController");

// Apply
router.post(
  "/apply",
  controller.applyJob
);

// Get applications
router.get(
  "/applications/:jobId",
  controller.getApplications
);

// Shortlist candidate
router.put(
  "/shortlist/:id",
  controller.shortlistCandidate
);

// Get shortlisted
router.get(
  "/shortlisted",
  controller.getShortlisted
);

// Dashboard
router.get(
  "/dashboard",
  controller.dashboard
);

module.exports = router;