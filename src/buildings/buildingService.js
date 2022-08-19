const Buildings = require('./buildingModel');
const mongoose = require('mongoose');

const addNewBuilding = async (image, ownerID, name, totalFloors) => {
  try {
    const building = await Buildings.create({
      image: image,
      belongsTo: ownerID,
      name: name,
      totalFloors: totalFloors,
    });
    return building
  } catch (err) {
    return null
  }
};

const findBuildingByOwnerAndName = async (ownerID, name) => {
  const building = await Buildings.findOne({
    belongsTo: mongoose.Types.ObjectId(ownerID),
    name: name,
  });
  return building;
};

const findBuildingByOwner = async (ownerID) => {
  const building = await Buildings.find({
    belongsTo: mongoose.Types.ObjectId(ownerID),
  });
  return building;
};

const findBuildingByID = async (buildingID) => {
  const building = await Buildings.findOne({
    _id: mongoose.Types.ObjectId(buildingID),
  });
  return building;
};

module.exports = {
  addNewBuilding,
  findBuildingByOwnerAndName,
  findBuildingByOwner,
  findBuildingByID,
};
