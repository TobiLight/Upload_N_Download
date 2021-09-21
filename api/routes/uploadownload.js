const { Router } = require("express");
const router = Router();
const {
  UploadFile,
  DownloadFile,
  getFiles,
} = require("../../controllers/upload");

router.post("/upload", UploadFile);
router.get("/files", getFiles);
router.get("/download/:fileName", DownloadFile);

module.exports = router;
