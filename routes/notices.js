const express = require("express");
const router = express.Router();
const moment = require("moment");
const Notice = require("../models/notices");

router.post("/", (req, res) => {
  const notice = new Notice({
    notice_title: req.body.notice_title,
    notice_subject: req.body.notice_subject,
    notice_desc: req.body.notice_desc,
    notice_date: moment()
  });
  notice
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Notice Added Successfully"
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
});

router.delete("/deleteNotice/:id", (req, res) => {
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
});

module.exports = router;
