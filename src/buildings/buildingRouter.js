const express = require('express');
const router = express.Router();

const jwtVerification = require('../shared/tokenVerificator');

const upload = require('../config/multer');

const BuildingService = require('./buildingService');
const { buildingValidator, validationResult } = require('./buildingsValidator');

const deleteAsset = require('../utils/deleteAsset')


router.post('/building', upload.single('image'), jwtVerification, buildingValidator, async (req, res) => {
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

  let image = '';
  if (req.file) {
    image = req.file.filename;
  } else {
    image = 'NoImageAvailable.png';
  }

  const { buildingName, floors } = req.body;
  const owner = req.userId;
  const building = await BuildingService.addNewBuilding(image, owner, buildingName, floors);

  if (!building) {
    return res.status(400).send({
      status: 'Oops something went wrong!',
      message: 'Building couldn\'t be added'
    })
  }

  res
    .status(201)
    .send({ status: 'Success', message: 'Successfully added new building' });
});

router.get('/building', jwtVerification, async (req, res) => {
  const owner = req.userId;
  const buildings = await BuildingService.findBuildingByOwner(owner);
  res.json(buildings);
});

module.exports = router;
