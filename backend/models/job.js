// models/Job.js

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  "Job title": String,
  "Work mode": String,
  "Experience level": String,
  "Skills": [String],
  Freshness: { type: String, default: "1 day ago" } // optional field
});

module.exports = mongoose.model("Job", jobSchema);
