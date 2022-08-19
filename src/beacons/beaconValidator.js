const { check, validationResult } = require('express-validator');
const BeaconService = require('./beaconService')


module.exports = {
    beaconAdd: [
        check('buildingData')
            .notEmpty().withMessage("Missing building data").bail(),
        check('beaconData')
            .notEmpty().withMessage("Missing beacon identifiers").bail()
            .custom(async (value, { req }) => {
                const { buildingData } = req.body;
                const beacon = await BeaconService.findBeaconByIdentifiers(value, buildingData.buildingID);
                if (beacon) {
                    throw new Error(`Beacon with same identifiers has already been added to this building under the name ${beacon[0].name}`);
                }
                return true
            }).bail(),
        check('name')
            .notEmpty().withMessage('Missing name property').bail(),
        check('atFloor')
            .notEmpty().withMessage("Missing at floor property").bail()
            .custom((value, { req }) => {
                if (isNaN(Number(value))) {
                    throw new Error('atFloor field must contain valid number')
                }
                return true
            }),
        check('dataType')
            .notEmpty().withMessage("Missing dataType property").bail()
            .custom(async (value, { req }) => {
                if (value !== 'plain-text' && value !== 'image' && value !== 'web-address') {
                    throw new Error('Invalid datatype to be transmitted');
                }
                return true
            }).bail(),
        check("data")
            .exists({ checkFalsy: true }).withMessage("Beacon data to be transmitted is missing")
    ],
    beaconUpdate: [
        check('id')
            .notEmpty().withMessage('Missing id property').bail(),
        check('name')
            .notEmpty().withMessage('Missing name property').bail(),
        check('atFloor')
            .notEmpty().withMessage("Missing at floor property").bail()
            .custom((value, { req }) => {
                if (isNaN(Number(value))) {
                    throw new Error('atFloor field must contain valid number')
                }
                return true
            }),
        check('dataType')
            .notEmpty().withMessage("Missing dataType property").bail()
            .custom((value, { req }) => {
                if (value !== 'plain-text' && value !== 'image' && value !== 'web-address') {
                    throw new Error('Invalid datatype to be transmitted');
                }
                return true
            }).bail(),
        check("data")
            .custom((value, { req }) => {
                if (!value && !req.file.filename) {
                    throw new Error("Beacon data to be transmitted is missing")
                }
                return true
            })
    ],
    validationResult: validationResult
}