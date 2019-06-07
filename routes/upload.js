var express = require("express");
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, file.fieldname + "-" + Date.now() + ext);
  }
});

var imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }
});

var uploadRouter = express.Router();

uploadRouter.route("/").post(upload.single("image"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(req.file);
  console.log(req.file);
});

module.exports = uploadRouter;
