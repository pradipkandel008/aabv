//For web only

var express = require("express");
var multer = require("multer");
var path = require("path");
const auth = require("../middleware/auth");
const User = require("../models/users");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "user" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 //50MB
  },
  fileFilter: fileFilter
});

var uploadRouter = express.Router();

//route for uploding image for profile image for web only
uploadRouter.put("/updateUserImage/:id", upload.single("user_image"), function(
  req,
  res
) {
  id = req.params.id;
  console.log(req.file.path);
  if (req.file.path != null) {
    User.findById(id).then(user => {
      let path = user.user_image;
      fs.unlink(path, err => {
        if (err) console.log(err);
      });
    });
  }

  try {
    User.updateOne({ _id: id }, { $set: { user_image: req.file.path } })
      .then(function(user, err) {
        if (err) {
          console.log(err);
        }
        res.status(201).json({
          message: "Image Uploaded Successfully"
        });
      })
      .catch(function(e) {
        res.status(422).json({
          message: "Unable to Update:" + e
        });
      });
  } catch (e) {}
});

module.exports = uploadRouter;
