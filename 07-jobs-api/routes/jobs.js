const jobsRouter = require("express").Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controller/jobs");

jobsRouter.route("/").get(getAllJobs).post(createJob);
jobsRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;
