const upload = require("../utils/multer");
const fs = require("fs");
const path = require("path");

exports.UploadFile = (req, res, next) => {
  upload.single("temlax_file")(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        status: "Upload failed",
        error: err.message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        error: "Please attach a file to upload!",
      });
    }

    return res.status(200).json({
      message: "File uploaded successfully!",
    });
  });
};

exports.DownloadFile = (req, res, next) => {
  if (!req.params.fileName) {
    return res.status(400).json({
      error: "Filename is required",
    });
  }

  const fileName = req.params.fileName;
  const dirPath = path.join(__dirname, "../uploads/");

  res.download(dirPath + fileName, (err) => {
    if (err) {
      return res.status(500).json({
        err: err,
        message: "Download failed!",
      });
    }
    console.log("File downloaded");
  });
};

exports.getFiles = (req, res) => {
  const dirPath = path.join(__dirname, "../uploads/");
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        message: "Unable to scan files!",
      });
    }

    let filesToDownload = [];
    files.forEach((file) => {
      filesToDownload.push({
        name: file,
        url: "http://localhost:6565/downloads/" + file,
      });
    });
    return res.status(200).json({
      files: filesToDownload,
    });
  });
};
