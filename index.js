const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;
const mongoose = require('./src/config/database');
const cors = require('./src/config/cors');

const UserRouter = require('./src/users/userRouter');
const BuildingRouter = require('./src/buildings/buildingRouter');
const BeaconRouter = require('./src/beacons/beaconRouter');
const AuthRouter = require('./src/auth/authRouter');

const path = require('path');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(UserRouter);
app.use(BuildingRouter);
app.use(BeaconRouter);
app.user(AuthRouter);

app.use(cors);

app.get('/', (req, res) => {
  console.log(path.join(__dirname, './uploads'));
  res.send('Connected to server successfully!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
