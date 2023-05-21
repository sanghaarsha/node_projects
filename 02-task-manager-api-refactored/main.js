require("dotenv").config(); // importing automatically executes function
const PORT = 3000;

const express = require("express");
app = express();
// importing routes
const tasks = require("./routes/tasks");
const routeDoesNotExist = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

// requests
// app.get('/api/v1/tasks') -> get all tasks
// app.post('/api/v1/tasks') -> create a new task
// app.get('/api/v1/tasks/:id') -> get single task
// app.patch('/api/v1/tasks/:id') -> update a task
// app.delete('/api/v1/tasks/:id') -> delete a task

// database
const connectDB = require("./db/connect");

// middleware
app.use(express.static("./public")); // setting public directory
app.use(express.json()); // for accessing req.body

// api routes
app.use("/api/v1/tasks", tasks);

// non-existent routes
app.use("*", routeDoesNotExist);

// custom error handler
app.use(errorHandlerMiddleware);

// start server iff database connection is successful
const start = async () => {
  try {
    await connectDB(process.env.mongo_uri);
    app.listen(PORT, () => {
      console.log(`App running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
