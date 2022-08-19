const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname.startsWith('building')) {
      cb(null, path.join(__dirname, '../../uploads/buildings'));
    } else if (file.originalname.startsWith('beacon')) {
      cb(null, path.join(__dirname, '../../uploads/beacons'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
