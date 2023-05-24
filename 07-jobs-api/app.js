require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");

// middleware to parse body
app.use(express.json());

// routes
app.use(express.static("./public"));
app.use("/api/v1", mainRouter);

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
