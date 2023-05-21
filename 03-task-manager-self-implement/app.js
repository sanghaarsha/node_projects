require("dotenv").config();
const MONGO_URI = process.env.mongo_uri;
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();

const router = require("./routes/tasks");
const connectDB = require("./db/connect");

// serve public dir
app.use(express.static("./public"));

// middleware
app.use(express.json());

// api route
app.use("/api/v1/tasks", router);

// starting server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
