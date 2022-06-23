const mongoose = require("mongoose");

const beaconSchema = new mongoose.Schema(
  {
    atFloor: { type: Number, required: true },
    buildingData: {
      buildingID: { type: mongoose.Schema.Types.ObjectId, required: true },
      totalFloors: { type: Number, required: true },
    },
    messageType: { type: String, required: true },
  },
  { discriminatorKey: "messageType" }
);

const messageTypeTextSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

const messageTypeImageSchema = new mongoose.Schema({
  message: { type: Buffer, required: "true" },
});

const beaconModel = mongoose.model("Beacons", beaconSchema);

const BeaconWithText = beaconModel.discriminator("text", messageTypeTextSchema);
const BeaconWithImage = beaconModel.discriminator(
  "image",
  messageTypeImageSchema
);

module.exports = {
  BeaconWithText,
  BeaconWithImage,
};
