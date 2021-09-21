const { Router } = require("express");
const router = Router();
const uploadRoute = require("./routes/uploadownload");

router.use("/", uploadRoute);

module.exports = router;
