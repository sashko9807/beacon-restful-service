const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;
const cors = require('./config/cors');
const db = require('./config/database');

const UserRouter = require('./users/userRouter');
const BuildingRouter = require('./buildings/buildingRouter');
const BeaconRouter = require('./beacons/beaconRouter');
const AuthRouter = require('./auth/authRouter');
const FcmRouter = require('./fcmToken/tokenRouter')

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', FcmRouter)
app.use('/api/v1', UserRouter);
app.use('/api/v1', BuildingRouter);
app.use('/api/v1', BeaconRouter);
app.use('/api/v1', AuthRouter);

app.use(cors);

app.get('/', (req, res) => {
  res.send('Connected to server successfully!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
