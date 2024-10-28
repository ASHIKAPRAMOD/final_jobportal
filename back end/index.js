import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utiles/db.js";
import userRoute from "./route/user.route.js"
import companyRoute from "./route/company.route.js"
import jobsRoute from "./route/job.route.js";
import applicationsRoute from "./route/application.route.js"
dotenv.config({});
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOptions));
// api's
app.use("/api/v0/user", userRoute);
app.use("/api/v0/company", companyRoute);
app.use("/api/v0/jobs", jobsRoute);
app.use("/api/v0/applications", applicationsRoute);

// dummy api
// app.get("/hello", async (req, res) => {
//   res.send({ message: "Hello World!" });
// });

app.get("/view", async (req, res) => {
  try {
    var data = await userModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at port ${PORT}`);

})
//add jobs
app.post('/jobs', async(req, res) => {
  try{
    await JobsModel(req.body).save();
    res.send({message:"Data Added successfully"});
  }catch(err){
    console.log(err);
    
  }
  });
//api to add login details