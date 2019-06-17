const express = require("express");
const router = express.Router();
const moment = require("moment");
const Submission = require("../models/submissions");
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
    cb(null, file.originalname + Date.now());
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

router.get("/", function(req, res) {
  Submission.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(submission) {
      res.send(submission);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.post(
  "/addSubmission",
  auth,
  upload.single("assignment_file_user"),
  (req, res) => {
    Submission.find({
      user_id: req.body.user_id,
      assignment_id: req.body.assignment_id
    })
      .exec()
      .then(submission => {
        if (submission.length >= 1) {
          res.status(201).json({
            message: "File already submitted"
          });
        } else {
          const submission = new Submission({
            user_id: req.body.user_id,
            assignment_id: req.body.assignment_id,
            assignment_title: req.body.assignment_title,
            assignment_links: req.body.assignment_links,
            assignment_file_user: req.file.path,
            assignment_submitted_date: moment()
          });

          submission
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "Assignment Submitted Successfully"
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
        console.log(err);
        res.status(500).json({
          message: err
        });
      });
  }
);

router.delete("/deleteSubmission/:id", (req, res) => {
  Submission.findById(req.params.id).then(submission => {
    let path = submission.assignment_file_user;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    submission
      .delete()
      .then(function(result) {
        console.log("Assignment Submission Deleted Successfully");
        res.status(201).json({
          message: "Assignment Submission Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
