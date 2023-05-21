require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
