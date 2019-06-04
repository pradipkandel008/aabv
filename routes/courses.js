const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "course" + Date.now() + file.originalname);
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

const Course = require("../models/courses");

router.post("/", upload.single("course_image"), (req, res, next) => {
  const course = new Course({
    course_name: req.body.course_name,
    course_duration: req.body.course_duration,
    course_price: req.body.course_price,
    course_modules: req.body.course_modules,
    course_desc: req.body.course_desc
    // course_image: req.file.path
  });
  course
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        course_image: course.course_image
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

router.get("/", function(req, res) {
  Course.find()
    .then(function(course) {
      res.send(course);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.get("/:id", function(req, res) {
  Course.findById(req.params.id)
    .then(function(course) {
      res.send(course);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.put("/updateCourse/:id", function(req, res) {
  uid = req.params.id.toString();
  Course.findByIdAndUpdate(uid, req.body, { new: true })
    .then(function(course) {
      res.status(201).json({
        message: course
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

router.delete("/deleteCourse/:id", (req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(function(result) {
      console.log("Deleted Successfully");
      res.status(201).json({
        message: result
      });
    })
    .catch(function(e) {
      console.log(e);
    });
});

module.exports = router;
