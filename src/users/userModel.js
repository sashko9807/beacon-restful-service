const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
