const express = require("express");
const router = express.Router();
const moment = require("moment");
const Assignment = require("../models/assignments");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "assignment" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
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

router.post("/", upload.single("assignment_file"), (req, res) => {
  const assignment = new Assignment({
    module_code: req.body.module_code,
    module_name: req.body.module_name,
    assignment_no: req.body.assignment_no,
    assignment_desc: req.body.assignment_desc,
    assignment_deadline: req.body.assignment_deadline,
    assignment_file: req.file.path,
    assignment_publish_date: moment()
  });

  assignment
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Assignment Added Successfully"
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
  Assignment.find()
    .then(function(assignment) {
      res.send(assignment);
    })
    .catch(function(e) {
      res.send(e);
    });
});

/* router.get("/", function(req, res) {
  Notice.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(notice) {
      res.send(notice);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.get("/:id", function(req, res) {
  Notice.findById(req.params.id)
    .then(function(notice) {
      res.send(notice);
    })
    .catch(function(e) {
      res.send(e);
    });
}); */

router.delete("/deleteAssignment/:id", (req, res) => {
  Assignment.findByIdAndDelete(req.params.id)
    .then(function(result) {
      console.log("Assignment Deleted Successfully");
      res.status(201).json({
        message: "Assignment Deleted Successfully"
      });
    })
    .catch(function(e) {
      console.log(e);
    });
});

module.exports = router;
