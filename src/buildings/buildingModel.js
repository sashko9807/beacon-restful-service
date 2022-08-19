const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  image: { type: String, required: true },
  belongsTo: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  totalFloors: { type: Number, required: true },
});

const buildingModel = new mongoose.model('Buildings', buildingSchema);

module.exports = buildingModel;
