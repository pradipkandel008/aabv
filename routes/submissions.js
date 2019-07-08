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
    cb(null, "submission" + Date.now() + file.originalname);
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

//route for getting all submissions
router.get("/", function(req, res) {
  Submission.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .populate("user_id")
    .populate("assignment_id")
    .exec()
    .then(function(submission) {
      res.send(submission);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting submissions by id
router.get("/:id", function(req, res) {
  Submission.find({ assign_id: req.params.id })
    .populate("user_id")
    .populate("assignment_id")
    .then(function(submission) {
      res.send(submission);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating submissions
router.get("/update/:id", function(req, res) {
  Submission.findById(req.params.id)
    .then(function(submission) {
      res.send(submission);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for posting submission
router.post(
  "/addSubmission",
  auth,
  upload.single("assignment_file_user"),
  (req, res) => {
    Submission.find({
      u_id: req.body.user_id,
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
            assignment_submitted_date: Date.now(),
            assign_id: req.body.assignment_id,
            u_id: req.body.user_id
          });

          submission
            .save()
            .then(result => {
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

//route for deleting submissions
router.delete("/deleteSubmission/:id", auth, (req, res) => {
  Submission.findById(req.params.id).then(submission => {
    let path = submission.assignment_file_user;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    submission
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Assignment Submission Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

//route for updating submissions
router.put(
  "/updateSubmission/:id",
  auth,
  upload.single("assignment_file_user"),
  function(req, res) {
    id = req.params.id.toString();
    if (req.file.path != null) {
      Submission.findById(id).then(submission => {
        let path = submission.assignment_file_user;
        fs.unlink(path, err => {
          if (err) console.log(err);
        });
      });
    }
    var datenow = moment();

    Submission.update(
      { _id: id },
      {
        $set: {
          assignment_title: req.body.assignment_title,
          assignment_links: req.body.assignment_links,
          assignment_file_user: req.file.path
        }
      }
    )
      .then(function(submission) {
        res.status(201).json({
          message: "Assignment Submission Updated Successfully"
        });
      })
      .catch(function(e) {
        res.send(e);
        console.log(e);
      });
  }
);

//Android
//route for getting submission in Android
router.get("/submissions/Android", function(req, res) {
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

//route for getting submissions of a particular user for android
router.get("/android/:id", function(req, res) {
  uid = req.params.id;
  Submission.find({ u_id: uid })
    .then(function(submission) {
      res.send(submission);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for adding submissions for android
router.post("/addSubmissionAndroid", (req, res) => {
  Submission.find({
    user_id: req.body.user_id,
    assignment_id: req.body.assignment_id
  })
    .exec()
    .then(submission => {
      if (submission.length >= 1) {
        res.status(201).json({
          err_message: "File already submitted"
        });
      } else {
        const submission = new Submission({
          user_id: req.body.user_id,
          assignment_id: req.body.assignment_id,
          assignment_title: req.body.assignment_title,
          assignment_links: req.body.assignment_links,
          assignment_file_user: req.body.assignment_file_user,
          assignment_submitted_date: moment(),

          assign_id: req.body.assignment_id,
          u_id: req.body.user_id
        });

        submission
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              suc_message: "Assignment Submitted Successfully"
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
});

//route for updating submissions for android
router.put("/updateSubmissionAndroid/:id", (req, res) => {
  sid = req.params.id;
  Submission.update(
    { _id: sid },
    {
      $set: {
        assignment_title: req.body.assignment_title,
        assignment_links: req.body.assignment_links,
        assignment_file_user: req.body.assignment_file_user
      }
    }
  )
    .then(function(submission) {
      res.status(201).json({
        suc_message: "Assignment Submission Updated Successfully"
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

//route for deleting submissions for android
router.delete("/deleteSubmission/Android/:id", (req, res) => {
  Submission.findById(req.params.id).then(submission => {
    submission
      .delete()
      .then(function(result) {
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
