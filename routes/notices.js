const express = require("express");
const router = express.Router();
const Notice = require("../models/notices");

router.post("/", (req, res) => {
  const notice = new Notice({
    notice_title: req.body.notice_title,
    notice_subject: req.body.notice_subject,
    notice_desc: req.body.notice_desc,
    notice_date: req.body.notice_date
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
  Notice.find()
    .then(function(notice) {
      res.send(notice);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
