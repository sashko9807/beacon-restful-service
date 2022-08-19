const { body, validationResult } = require('express-validator');
const UserService = require('./userService');

module.exports = {
  userValidator: [
    body('email')
      .notEmpty().withMessage('Email field is required').bail()
      .isEmail().withMessage('Must be a valid email address').bail()
      .custom(async (email) => {
        const user = await UserService.findUserByEmail(email);
        if (user) {
          throw new Error('Email is in use');
        }
        return true
      }),
    body('password')
      .notEmpty().withMessage('Password is required').bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  validationResult: validationResult
};
