const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/users");

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
          gender: req.body.gender,
          batch: req.body.batch,
          section: req.body.section,
          user_image: "",
          user_name: req.body.user_name,
          password: req.body.password,
          user_type: "user"
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
  const token = await user.generateAuthToken();
  res.status(201).json({
    token: token,
    user: user
  });
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/updateUser/:id", auth, function(req, res) {
  uid = req.body.id;
  User.update(
    { _id: uid },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        batch: req.body.batch,
        section: req.body.section,
        user_name: req.body.user_name,
        password: req.body.password
      }
    }
  )
    .then(function(user) {
      res.status(201).json({
        message: "User Details Updated Successfully"
      });
    })
    .catch(function(e) {
      res.status(422).json({
        message: "Unable to Update:" + e
      });
    });
});

module.exports = router;
