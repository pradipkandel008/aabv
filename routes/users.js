const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

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
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const User = require("../models/users");

router.post("/register", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(201).json({
          message: "Mail already exists"
        });
      } else {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          gender: req.body.gender,
          batch: req.body.batch,
          section: req.body.section,
          user_image: "",
          user_name: req.body.user_name,
          password: req.body.password,
          user_type: "user"
        });
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Register Successful"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: err
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

router.get("/me", auth, function(req, res) {
  res.send(req.user);
});

router.post("/login", async function(req, res) {
  const user = await User.checkCrediantialsDb(
    req.body.user_name,
    req.body.password
  );
  const token = await user.generateAuthToken();
  res.status(201).json({
    token: token,
    user: user
  });
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
