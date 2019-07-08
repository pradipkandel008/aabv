const express = require("express");
const router = express.Router();
const moment = require("moment");
const Enquire = require("../models/enquires");

//route for adding enquiries
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

//route for getting all enquiries
router.get("/", function(req, res) {
  Enquire.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(enquire) {
      res.send(enquire);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
