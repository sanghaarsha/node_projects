require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
require("express-async-errors"); // works just like our async wrapper

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const productsRouter = require("./routes/products");

// middlewares
app.use(express.json()); //for body parsing

// routes
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// product routes
app.use("/api/v1/products", productsRouter);

// other middlewares
app.use("*", notFoundMiddleware); //404
app.use(errorHandlerMiddleware); //custom error handling

// start app if  db connects successfully
const start = async () => {
  try {
    await connectDB(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`app live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
