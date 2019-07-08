const express = require("express");
const router = express.Router();
const moment = require("moment");
const Assignment = require("../models/assignments");
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const auth = require("../middleware/auth");

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

//route for adding assignment
router.post("/", auth, upload.single("assignment_file"), (req, res) => {
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

//route for getting assignments
router.get("/", function(req, res) {
  Assignment.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(assignment) {
      res.send(assignment);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting assignment by id
router.get("/:id", function(req, res) {
  Assignment.findById(req.params.id)
    .then(function(assignment) {
      res.send(assignment);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for deleting assignment
router.delete("/deleteAssignment/:id", auth, (req, res) => {
  Assignment.findById(req.params.id).then(assignment => {
    let path = assignment.assignment_file;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    assignment
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Assignment Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

//route for updating assignment
router.put(
  "/updateAssignment/:id",
  auth,
  upload.single("assignment_file"),
  function(req, res) {
    id = req.params.id.toString();
    if (req.file.path != null) {
      Assignment.findById(id).then(assignment => {
        let path = assignment.assignment_file;
        fs.unlink(path, err => {
          if (err) console.log(err);
        });
      });
    }

    Assignment.update(
      { _id: id },
      {
        $set: {
          module_code: req.body.module_code,
          module_name: req.body.module_name,
          assignment_no: req.body.assignment_no,
          assignment_desc: req.body.assignment_desc,
          assignment_deadline: req.body.assignment_deadline,
          assignment_file: req.file.path
        }
      }
    )
      .then(function(assignment) {
        res.status(201).json({
          message: "Assignment Updated Successfully"
        });
      })
      .catch(function(e) {
        res.send(e);
        console.log(e);
      });
  }
);

module.exports = router;
