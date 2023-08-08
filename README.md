## About

A restful service handling the business logic, necessary for BeaconMS and BeaconScanners' functionality

## Project setup

### Prerequisite

- [Node.js](https://nodejs.org/en/download)
- Existing firebase account
- [Docker](https://www.docker.com/get-started/) with [Docker Compose v2](https://docs.docker.com/compose/)
- (\*optional) Sendgrid account

#### Setting up Firebase Cloud Messaging

1. Go to [firebase console](https://console.firebase.google.com/) and select existing, or create new project. The project should be the same as [BeaconScanner](https://github.com/sashko9807/BeaconScanner)
2. Go to Project settings -> Service account -> Firebase Admin SDK -> Generate new private key
3. Copy the generated private key in the root directory of the project, then rename it to "firebase.json"

#### Setting up development server

1. Run `cp .env.example .env`
2. Run `npm install`
3. Fill the required settings from the `Enviroment variables` table
4. Run `docker-compose up -d` to setup local mongodb instance <br> _Local mongo-express instance is available at `http://localhost:8081`_
5. Run `npm run start`

#### Enviroment variables

| Setting                    | Description                                       | Mandatory | Default value                                                |
| -------------------------- | ------------------------------------------------- | --------- | ------------------------------------------------------------ |
| `DB_CONN`                  | MONGODB connection URI                            | required  | `mongodb://admin:admin@localhost:27017/bms?authSource=admin` |
| `PORT`                     | Running port of local server                      | required  | `3001`                                                       |
| `ACCESS_TOKEN`             | Access Token secret                               | required  | `access-token-secret`                                        |
| `REFRESH_TOKEN`            | Refresh token secret                              | required  | `refresh-token-secret`                                       |
| `ACCESS_TOKEN_EXPIRATION`  | Access token expiration time in format`Xd Xm Xs`  | required  | `15m`                                                        |
| `REFRESH_TOKEN_EXPIRATION` | Refresh token expiration time in format`Xd Xm Xs` | required  | `1d`                                                         |
| `SENDER_EMAIL`             | Sender of email                                   | optional  |
| `SENDGRID_API_KEY`         | Api key needed for using Sendgrid service         | optional  |
