const service = require("../services/applicationService");

// Apply
exports.applyJob = async (req, res) => {
  try {
    const data = await service.apply(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Applications
exports.getApplications = async (req, res) => {
  try {
    const data = await service.getApplications(
      req.params.jobId,
      req.query.status
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Shortlist
exports.shortlistCandidate = async (req, res) => {
  try {
    const data =
      await service.shortlist(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Shortlisted
exports.getShortlisted = async (req, res) => {
  try {
    const data =
      await service.getShortlisted();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Dashboard
exports.dashboard = async (req, res) => {
  try {
    const data =
      await service.getDashboard();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};