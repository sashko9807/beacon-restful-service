const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoURI = process.env.DB_CONN;

mongoose.connect(mongoURI);

mongoose.connection.on("connected", (err) => {
  if (err) throw err;
  console.log("Connected successfully to db");
});

module.exports = mongoose;
