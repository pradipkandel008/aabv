const express = require("express");
const router = express.Router();
const moment = require("moment");
const Feedback = require("../models/feedbacks");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
  const feedback = new Feedback({
    u_id: req.body.u_id,
    feedback: req.body.feedback
  });
  feedback
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Feedback Posted Successfully"
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
  Feedback.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .populate("u_id")
    .exec()
    .then(function(feedback) {
      res.send(feedback);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.delete("/deleteFeedback/:id", auth, (req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(function(result) {
      console.log("Feedback Deleted Successfully");
      res.status(201).json({
        message: "Feedback Deleted Successfully"
      });
    })
    .catch(function(e) {
      console.log(e);
    });
});

module.exports = router;
