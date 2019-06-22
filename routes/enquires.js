const express = require("express");
const router = express.Router();
const moment = require("moment");
const Enquire = require("../models/enquires");

router.post("/", (req, res) => {
  const enquire = new Enquire({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  });
  enquire
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Enquire Posted Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

module.exports = router;
