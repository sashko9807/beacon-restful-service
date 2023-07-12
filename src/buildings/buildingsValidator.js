const { check, validationResult } = require('express-validator');
const BuildingService = require('./buildingService');

module.exports = {
  buildingValidator: [
    check('buildingName')
      .notEmpty().withMessage('Name field is required').bail()
      .custom(async (value, { req }) => {
        const building = await BuildingService.findBuildingByOwnerAndName(
          req.userId,
          value
        );
        if (building) {
          throw new Error('Building with that name already exists for the user');
        }
      }).bail(),
    check('floors')
      .notEmpty().withMessage('Floor field is required').bail()
      .custom((value, { req }) => {
        if (isNaN(Number(value))) {
          throw new Error('Floor field must contain valid number')
        }
        return true
      }),
  ],
  validationResult: validationResult
}


