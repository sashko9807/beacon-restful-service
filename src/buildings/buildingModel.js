const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  image: Buffer,
  belongsTo: { type: mongoose.Types.ObjectId, required: true },
  totalFloors: { type: Number, required: true },
});

const buildingModel = new mongoose.model("Buildings", buildingSchema);

module.exports = buildingModel;
