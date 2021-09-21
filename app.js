require("dotenv").config();
const express = require("express");
const app = express();
const AppRoutes = require("./api/index");

app.disable("x-powered-by");
// app.use(express.static("public"));
// app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/", AppRoutes);
app.listen(process.env.PORT, () => {
  console.log("App is 🚗💨");
});
