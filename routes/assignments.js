const express = require("express");
const router = express.Router();
const moment = require("moment");
const Assignment = require("../models/assignments");

router.post("/", (req, res) => {
  const assignment = new Assignment({
    module_code: req.body.module_code,
    module_name: req.body.module_name,
    assignment_no: req.body.assignment_no,
    assignment_desc: req.body.assignment_desc,
    assignment_deadline: req.body.assignment_deadline,
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

/* router.delete("/deleteNotice/:id", (req, res) => {
  Notice.findByIdAndDelete(req.params.id)
    .then(function(result) {
      console.log("Notice Deleted Successfully");
      res.status(201).json({
        message: "Notice Deleted Successfully"
      });
    })
    .catch(function(e) {
      console.log(e);
    });
}); */

module.exports = router;
