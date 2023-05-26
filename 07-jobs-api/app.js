require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

require("express-async-errors");

const express = require("express");
// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const authMiddleware = require("./middlewares/auth");

// middleware to parse body
app.use(express.json());

// security middlewares
app.set("trust proxy", 1); // support reverse proxy
app.use(
  rateLimiter({
    windowMs: 15 * 16 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use(express.static("./public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

// ! always use these middlewares after routes
app.use(errorHandler);
app.use(notFound);

const start = async (uri) => {
  try {
    await connectDB(uri);
    app.listen(PORT, () => {
      console.log(`app live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(MONGO_URI);
