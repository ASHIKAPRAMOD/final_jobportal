import Job from "../model/job.js";

// admin post method
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, vacancy, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !vacancy || !companyId) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false
      })
    };
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      vacancy,
      company: companyId,
      recruiter: userId
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}
// for job seekers i.e, users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };
    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
}
// admin created jobs
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ recruiter: adminId }).populate({
      path: 'company',
      createdAt: -1
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
// to update the job
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      vacancy,
      companyId
    } = req.body;

    const updateData = {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      vacancy,
      company: companyId
    };

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      });
    }
    return res.status(200).json({
      message: "Job information updated.",
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeJob = async (req, res) => {
  try {
    const adminId = await req.id;
    await Job.findByIdAndDelete(req.params.id, adminId).then((docs) => {
      res.status(200).json({
        message: `deleted : ${docs}`,
        docs,
        success: true
      });
    });

    const jobExists = await Job.findById(req.params.id);
    if (jobExists) {
      res.status(400).json({
        message: "Job wasn't deleted.",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
  }
};




