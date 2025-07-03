// middleware/upload.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create folder if it doesn't exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/';
    if (file.fieldname === 'profileImage') {
      folder += 'profileImages';
    } else if (file.fieldname === 'eventImages') {
      folder += 'eventImages';
    } else {
      folder += 'others';
    }

    // Ensure the folder exists
    ensureDirExists(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = upload;