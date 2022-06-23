const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("./config/database");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected to server successfully!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
