const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const userId = req.user.userId;

  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    jobs,
    count: jobs.length,
  });
};

const getJob = async (req, res) => {
  const jobID = req.params.id;
  const userId = req.user.userId;

  const job = await Job.findOne({ _id: jobID, createdBy: userId });

  if (!job) {
    throw new NotFoundError("no such job found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const createdBy = req.user.userId;

  const job = await Job.create({ company, position, createdBy });

  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const jobID = req.params.id;
  const userId = req.user.userId;

  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("must provide company and position");
  }

  let updatedJob = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: userId },
    { company, position },
    { new: true, runValidators: true }
  );

  if (!updatedJob) {
    throw new NotFoundError("job not found");
  }

  res.status(StatusCodes.OK).json(updatedJob);
};

const deleteJob = async (req, res) => {
  const jobID = req.params.id;
  const userId = req.user.userId;

  const deletedJob = await Job.findOneAndDelete({
    _id: jobID,
    createdBy: userId,
  });

  if (!deletedJob) {
    throw new NotFoundError("job not found");
  }

  res.status(StatusCodes.OK).json({ deletedJob });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
