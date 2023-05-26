const getAllJobs = async (req, res) => {
  res.json({
    ...req.user,
  });
};

const getJob = async (req, res) => {
  res.json({
    msg: "get single job",
  });
};

const createJob = async (req, res) => {
  res.json({
    msg: "create a job",
  });
};

const updateJob = async (req, res) => {
  res.json({
    msg: "update a job",
  });
};

const deleteJob = async (req, res) => {
  res.json({
    msg: "delete a job",
  });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
