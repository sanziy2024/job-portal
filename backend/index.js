const express=require("express")
const cors=require('cors')
const mongoose=require("mongoose")

const app=express()
const port=5000

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URL="mongodb://localhost:27017/jobportal"

mongoose.connect(MONGO_URL)
.then(()=>console.log("connected"))
.catch((error)=>console.error("mongodb connection error",error))

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);


app.get("/",(req,res)=>{
  res.send("Hello from backend")
})

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
  
})