const express = require("express");
const router = express.Router();
const moment = require("moment");
const Feedback = require("../models/feedbacks");
const auth = require("../middleware/auth");

//route for adding feedback
router.post("/", auth, (req, res) => {
  const feedback = new Feedback({
    u_id: req.body.u_id,
    feedback: req.body.feedback
  });
  feedback
    .save()
    .then(result => {
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

//route for getting all feedbacks
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

//route for deleting feedback by id
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

//route for posting feedbacks for android
router.post("/feedbacks/Android", (req, res) => {
  const feedback = new Feedback({
    u_id: req.body.u_id,
    feedback: req.body.feedback
  });
  feedback
    .save()
    .then(result => {
      res.status(201).json({
        suc_message: "Feedback Posted Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting feedback by user id for android
router.get("/Android/:id", function(req, res) {
  var uid = req.params.id;
  Feedback.find({ u_id: uid })
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

//route for deleting feedbacks
router.delete("/deleteFeedback/Android/:id", (req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(function(result) {
      res.status(201).json({
        message: "Feedback Deleted Successfully"
      });
    })
    .catch(function(e) {
      console.log(e);
    });
});

module.exports = router;
