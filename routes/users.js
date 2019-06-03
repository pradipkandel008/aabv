const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const middleware = require("../middleware/middleware");
const auth = require("../middleware/auth");
const auth2 = require("../middleware/auth2");

const User = require("../models/users");

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(201).json({
          message: "Mail already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              batch: req.body.batch,
              section: req.body.section,
              user_name: req.body.user_name,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Register Successful"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  message: err
                });
              });
          }
        });
      }
    })
    .catch(err => {});
});

router.post("/signin", auth2, (req, res) => {
  console.log("in here");
  User.find({ user_name: req.body.user_name })
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.status(401).json({
          message1: "Auth Failed"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              message3: "Auth Failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                user_name: user[0].user_name,
                id: user[0]._id
              },
              "secret",
              {
                expiresIn: "1h"
              }
            );
            console.log("token is" + token);
            res.status(200).json({
              message: "Auth Success",
              token: token
            });
          } else {
            res.status(401).json({
              message2: "Auth Failed"
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

router.post("/register", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(201).json({
          message: "Mail already exists"
        });
      } else {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          batch: req.body.batch,
          section: req.body.section,
          user_name: req.body.user_name,
          password: req.body.password
        });
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Register Successful"
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
      res.status(500).json({
        message: err
      });
    });
});

router.get("/me", auth, function(req, res) {
  res.send(req.user);
});

router.post("/login", async function(req, res) {
  const user = await User.checkCrediantialsDb(
    req.body.user_name,
    req.body.password
  );
  console.log(user);
  const token = await user.generateAuthToken();
  res.send(token);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    status: "Bye!"
  });
});

module.exports = router;
