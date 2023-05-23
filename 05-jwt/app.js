require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
require("express-async-errors");
const app = express();

const routes = require("./routes/routes");

const connectDB = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

// index page
app.use(express.static("./public"));

// middlewares
app.use(express.json());
app.use(errorHandlerMiddleware);

// other middlewares
app.use("/api/v1/app", routes);
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
