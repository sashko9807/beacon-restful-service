const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Connected to server successfully!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
