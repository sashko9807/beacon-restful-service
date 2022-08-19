const mongoose = require('mongoose');

const beaconSchema = new mongoose.Schema({
  beaconData: {
    UUID: { type: String, required: true },
    major: { type: String, required: true },
    minor: { type: String, required: true },
  },
  name: { type: String, required: true },
  atFloor: { type: Number, required: true },
  buildingData: {
    buildingID: { type: mongoose.Schema.Types.ObjectId, required: true },
    totalFloors: { type: Number, required: true },
  },
  dataType: { type: String, required: true },
  data: { type: String, required: true },
});

const BeaconModel = mongoose.model('Beacons', beaconSchema);

module.exports = {
  BeaconModel,
};

