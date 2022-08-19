const express = require('express');

const router = express.Router();


const bcrypt = require('bcrypt');

const { userValidator, validationResult } = require('./userValidator');
const UserService = require('./userService');

const jwtVerification = require('../shared/tokenVerificator');

const mailSend = require('../utils/mailSend');
const { JWTSignToken } = require('../utils/JWTSignToken')

router.post('/user/register', userValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ status: 'Oops something went wrong', message: errors.array() });
  }
  const { email, password } = req.body;
  await UserService.addNewUser(email, password);
  res.status(201).send({
    status: 'Registration successfull',
    message: 'Successfully registered',
  });
});


router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.findUserByEmail(email);
  if (!user)
    return res.status(404).json({
      status: 'Oops something went wrong',
      message: 'Email not found',
    });

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch)
    return res.status(401).json({
      status: 'Oops something went wrong',
      message: 'Invalid password',
    });

  const [accessToken, refreshToken] = JWTSignToken(user._id, user.email)
  console.log(accessToken);
  console.log(refreshToken)

  return res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

router.put('/user/:id', jwtVerification, async (req, res) => {
  const { currPassword, newPassword } = req.query;
  const email = req.email;
  const user = await UserService.findUserByEmail(email);
  const passwordMatch = await bcrypt.compare(currPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({
      status: 'Oops something went wrong',
      message: 'Invalid password',
    });
  }
  await UserService.updateUserPassword(email, newPassword);
  return res.status(200).json({
    status: 'Success',
    message: 'User password successfully updated',
  });
});

router.put('/user/forgotPassword/:email', async (req, res) => {
  const { email } = req.params;
  const foundUser = await UserService.findUserByEmail(email);
  if (!foundUser) {
    return res.status(404).send({
      status: 'Oops. Something went wrong',
      message: 'Email not found',
    });
  }
  const generatedPassword = Math.random().toString(36).slice(-6);
  const user = await UserService.updateUserPassword(email, generatedPassword);
  if (!user) {
    return res.status(400).send({
      status: 'Oops something went wrong',
      message: 'Password couldn\'t be updated'
    })
  }
  mailSend(
    email,
    'Forgotten Password',
    `Hello,\n Your new password is: ${generatedPassword}`
  );
  return res.status(200).send({
    status: 'Success',
    message: 'New password has been sent to the email',
  });

});

module.exports = router;
