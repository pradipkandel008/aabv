const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");

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

//route for adding courses
router.post("/", auth, upload.single("course_image"), (req, res) => {
  const course = new Course({
    course_name: req.body.course_name,
    course_duration: req.body.course_duration,
    course_price: req.body.course_price,
    course_modules: req.body.course_modules,
    course_desc: req.body.course_desc,
    course_image: req.file.path
  });
  course
    .save()
    .then(result => {
      res.status(201).json({
        message: "Course Added Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all courses
router.get("/", function(req, res) {
  Course.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(course) {
      res.send(course);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting course by id
router.get("/:id", function(req, res) {
  Course.findById(req.params.id)

    .then(function(course) {
      res.send(course);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating course
router.put("/updateCourse/:id", auth, upload.single("course_image"), function(
  req,
  res
) {
  id = req.params.id.toString();
  if (req.file.path != null) {
    Course.findById(id).then(course => {
      let path = course.course_image;
      fs.unlink(path, err => {
        if (err) console.log(err);
      });
    });
  }

  Course.update(
    { _id: id },
    {
      $set: {
        course_name: req.body.course_name,
        course_duration: req.body.course_duration,
        course_price: req.body.course_price,
        course_modules: req.body.course_modules,
        course_desc: req.body.course_desc,
        course_image: req.file.path
      }
    }
  )
    .then(function(course) {
      res.status(201).json({
        message: "Course Updated Successfully"
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

//route for deleting course
router.delete("/deleteCourse/:id", auth, (req, res) => {
  Course.findById(req.params.id).then(course => {
    let path = course.course_image;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    course
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Course Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
