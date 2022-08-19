const express = require('express');
const router = express.Router();

const BeaconService = require('./beaconService');
const BuildingService = require('../buildings/buildingService');

const upload = require('../config/multer');
const { firebaseTopics } = require('../config/firebase-admin')

const { beaconAdd, beaconUpdate, validationResult } = require('./beaconValidator');

const sendPush = require('../utils/sendPush')
const fillUnpopulatedFloors = require('../utils/fillUnpopulatedFloors')
const deleteAsset = require('../utils/deleteAsset')

const path = require('path')

const BEACON_IMG_DIR = path.join(__dirname, '../../uploads/beacons')

router.post('/beacon/', upload.single('data'), beaconAdd, async (req, res) => {
  const { beaconData, name, atFloor, buildingData, dataType, data } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      deleteAsset(req.file.path)
    }
    return res.status(400).send({
      status: 'Oops something went wrong!',
      message: errors.array(),
    });
  }

  let currentData = '';
  if (dataType === " image" && req.file) {
    currentData = req.file.filename
  } else {
    currentData = data
  }

  const beacon = await BeaconService.addNewBeacon(
    beaconData,
    name,
    atFloor,
    buildingData,
    dataType,
    currentData
  );

  if (!beacon) {
    return res.status(400).send({
      status: 'Oops something went wrong!',
      message: 'Beacon couldn\'t be added',
    });
  }

  const payload = {
    _id: beacon._id,
    operation: 'add',
    beaconData: beaconData,
    name: name,
    dataType: dataType,
    data: data
  }
  sendPush(payload)
  res
    .status(201)
    .send({ status: 'Success', message: 'Beacon has been added successfully' });
});

router.put('/beacon/:id', upload.single("data"), beaconUpdate, async (req, res) => {
  const { name, atFloor, dataType, data } = req.body
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      deleteAsset(req.file.path)
    }
    return res.status(400).send({
      status: 'Oops something went wrong!',
      message: errors.array(),
    });
  }

  let currentData = '';
  if (req.file) {
    currentData = req.file?.filename
  } else {
    currentData = data
  }

  const beacon = await BeaconService.updateBeaconByID(
    id,
    name,
    atFloor,
    dataType,
    currentData
  );

  if (!beacon) {
    return res.status(400).send({
      status: 'Oops. Something went wrong',
      message: "Beacon couldn't be edited",
    });
  }
  if (beacon.dataType === "image" && beacon.data !== currentData) {
    deleteAsset(`${BEACON_IMG_DIR}/${beacon.data}`)
  }

  if (name !== beacon.name || dataType !== beacon.dataType || currentData !== beacon.data) {
    console.log(`sending push notification to update beacon`)
    const payload = {
      _id: id,
      operation: 'update',
      name: name,
      dataType: dataType,
      data: currentData
    }
    sendPush(payload, firebaseTopics.BEACON_DATA_UPDATE)
  }


  res.status(200).send({
    status: 'Success',
    message: 'Beacon has been edited successfully',
  });
});

router.delete('/beacon/:beaconID', async (req, res) => {
  const beaconID = req.query.id
  const beacon = await BeaconService.deleteBeaconById(beaconID);
  if (!beacon)
    return res.status(400).send({
      status: 'Oops. Something went wrong',
      message: "Beacon couldn't be removed",
    });

  if (beacon.dataType === "image") {
    deleteAsset(`${BEACON_IMG_DIR}/${beacon.data}`)
  }

  const payload = {
    _id: beaconID,
    operation: 'remove',
  }
  sendPush(payload, firebaseTopics.BEACON_DATA_UPDATE)

  res.status(200).send({
    status: 'Success',
    message: 'Beacon has been successfully removed',
  });
});


router.get('/beacon/:buildingID', async (req, res) => {
  const { buildingID } = req.params;

  let total_floors = 0;
  const beacons = await BeaconService.findBeaconsByBuildingID(buildingID);

  if (beacons.length === 0) {
    const building = await BuildingService.findBuildingByID(buildingID);
    total_floors = building.totalFloors;
  } else {
    total_floors = beacons[0].data[0].buildingData.totalFloors;
  }

  const sortedBeacons = fillUnpopulatedFloors(total_floors, beacons)
  res.json(sortedBeacons);
});

router.get('/beacons/fetchAll', async (req, res) => {
  const beacon = await BeaconService.fetchAllBeacons();
  if (!beacon) {
    return res.status(400).send({ status: 'Oops something went wrong', message: "Unable to fetch beacons" });
  }

  res.send(beacon)
})

module.exports = router;
