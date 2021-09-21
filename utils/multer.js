const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    file.originalname = file.originalname.replace(/\s+/g, "");
    cb(null, `${uuid()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".zip" && ext !== ".rar") {
    cb(null, false);
    return cb(new Error("Only .zip, .rar format allowed!"));
  }
  cb(null, true);
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000 * 1024 * 1024, fieldSize: 1000 * 1024 * 1024 },
});

module.exports = upload;
