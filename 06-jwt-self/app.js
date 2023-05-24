//* setting up configuration
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//* to avoid try-catch at every async requests
require("express-async-errors");

//* instantiation
const express = require("express");
app = express();

//* importing middlewares
const mainRouter = require("./routes/main");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");

//* using middlewares
app.use(express.static("public")); //? static files
app.use(express.json()); //? body parser
app.use("/api/v1", mainRouter); //? main router
app.use(errorHandler); //? custom error handler
app.use(notFound); //? 404

//* listening to requests
app.listen(PORT, () => {
  console.log(`app live at http://localhost:${PORT}`);
});
