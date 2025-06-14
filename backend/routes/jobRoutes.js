// routes/jobRoutes.js

const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// POST jobs
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job added", job });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
