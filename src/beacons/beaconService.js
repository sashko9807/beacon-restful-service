const { BeaconModel } = require('./beaconModel');
const mongoose = require('mongoose');

const addNewBeacon = async (
  beaconData,
  name,
  atFloor,
  buildingData,
  dataType,
  data
) => {
  try {
    const beacon = await BeaconModel.create({
      beaconData,
      name,
      atFloor,
      buildingData,
      dataType,
      data,
    })
    return beacon;
  } catch (err) {
    console.log(err)
    return null
  }
};



/**
* Fetch beacons by ID of the building  and group them by their atFloor property
*
* @param buildingID The id of the building where beacons have been added
* @return  Result of query
*/

const findBeaconsByBuildingID = async (buildingID) => {
  try {
    const beacons = await BeaconModel.aggregate([
      {
        $match: {
          'buildingData.buildingID': mongoose.Types.ObjectId(buildingID),
        },
      },
      {
        '$group': {
          _id: { floor: '$atFloor' },
          'data': {
            '$push': '$$ROOT',
          },
        },
      },
    ]);
    return beacons;
  } catch (err) {
    console.log(err);
    return null
  }
};

const deleteBeaconById = async (beaconID) => {
  try {
    const beacon = await BeaconModel.findOneAndDelete({
      _id: mongoose.Types.ObjectId(beaconID),
    });
    return beacon;
  } catch (err) {
    console.log(err);
    return null
  }
};


const updateBeaconByID = async (
  beaconID,
  name,
  floor,
  dataType,
  currentData
) => {
  try {
    const beacon = await BeaconModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(beaconID) },
      { $set: { name: name, atFloor: floor, dataType: dataType, data: currentData } }
    );
    return beacon;
  } catch (err) {
    console.log(err);
    return null
  }

};


const fetchAllBeacons = async () => {
  const beacon = await BeaconModel.find({}, { _id: 1, beaconData: 1, name: 1, dataType: 1, data: 1 })
  return beacon;
};

const fetchBeaconByID = async (beaconID) => {
  const beacon = await BeaconModel.find({ _id: beaconID }, { _id: 1, beaconData: 1, name: 1, dataType: 1, data: 1 })
  return beacon;
};

const findBeaconByIdentifiers = async (beaconIdentifier, buildingID) => {
  const beacon = await BeaconModel.findOne({
    'beaconData.UUID': beaconIdentifier.UUID,
    'beaconData.major': beaconIdentifier.major,
    'beaconData.minor': beaconIdentifier.minor,
    'buildingData.buildingID': mongoose.Types.ObjectId(buildingID)
  })

  return beacon
}

const findBeaconByNameAndFloor = async (beaconName, atFloor) => {
  const beacon = await BeaconModel.findOne({
    name: beaconName,
    atFloor: atFloor
  })

  return beacon
}

module.exports = {
  addNewBeacon,
  findBeaconsByBuildingID,
  deleteBeaconById,
  updateBeaconByID,
  fetchAllBeacons,
  fetchBeaconByID,
  findBeaconByIdentifiers,
  findBeaconByNameAndFloor
};
