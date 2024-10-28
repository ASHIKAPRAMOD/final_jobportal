import { application } from "express";
import Application from "../model/application.js";
import Job from "../model/job.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.jobId;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } }
                }
            });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            });
        }
        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// To see how many users applied
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.applicationId;

        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};