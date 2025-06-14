import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar';

function App() {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchInput, setSearchInput] = useState({
    Job_role: "",
    Job_type: "",
    skill: "",
    experience: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
         setJobs(data)
         setFilteredJobs(data)})
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);


  const handleSearch = () => {
    const { Job_role, Job_type, skill, experience } = searchInput;
  
    // If all fields are empty, show all jobs
    if (!Job_role && !Job_type && !skill && !experience) {
      setFilteredJobs(jobs);
      return;
    }
  
    const results = jobs
      .map((job) => {
        const matches =
          (Job_role && job["Job title"].toLowerCase().includes(Job_role.toLowerCase()) ? 1 : 0) +
          (Job_type && job["Work mode"].toLowerCase().includes(Job_type.toLowerCase()) ? 1 : 0) +
          (skill && job["Skills"].some((s) => s.toLowerCase().includes(skill.toLowerCase())) ? 1 : 0) +
          (experience && job["Experience level"].toLowerCase().includes(experience.toLowerCase()) ? 1 : 0);
        return { ...job, matchScore: matches };
      })
      .filter((job) => job.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  
    setFilteredJobs(results);
  };

  return (
    <>
    <Navbar/>
      <div className="text-center fw-bold text-light pb-5">
        <h1>Your ideal Job awaits, start the search</h1>
        <p>Get latest job openings that best suits you!</p>
      </div>



<div className="container-fluid">
        <div className="d-flex px-5">
          {["Job_role", "Job_type", "skill", "experience"].map((key, idx) => (
            <div className="input-group mb-3 mx-3" key={idx}>
              <input
                type={key === "experience" ? "text" : "text"}
                className="form-control"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={searchInput[key]}
                onChange={(e) =>
                  setSearchInput({ ...searchInput, [key]: e.target.value })
                }
              />
            </div>
          ))}

          <div className="mx-3">
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

        <div className="container card-body">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-danger fw-bold">No matching jobs found.</div>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={index} className="row border rounded m-2 bg-light">
                <div className="col">
                  <div className="mb-4 pt-4 text-start">
                    <strong>Job Title:</strong> {job["Job title"]} <br />
                    <strong>Work Mode:</strong> {job["Work mode"]} <br />
                    <strong>Experience Level:</strong> {job["Experience level"]} <br />
                    <strong>Skills:</strong> {job["Skills"].join(", ")}
                  </div>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                  <span>{job["Freshness"]}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    
    </>
  )
}

export default App
