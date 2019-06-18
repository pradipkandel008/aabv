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
          message_error: "Mail already exists"
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
              message_success: "Register Successful"
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

User.find({ user_type: "user" }).countDocuments(function(err, count) {
  router.get("/", function(req, res) {
    res.json(count);
  });
});
User.find({ user_type: "admin" }).countDocuments(function(err, count) {
  router.get("/admins", function(req, res) {
    res.json(count);
    console.log(count);
  });
});

router.post("/login", async function(req, res) {
  try {
    const user = await User.checkCrediantialsDb(
      req.body.user_name,
      req.body.password
    );
    //const message = await user.message;
    if (user) {
      // console.log("We are here");
      console.log(user);
      const token = await user.generateAuthToken();
      res.status(201).json({
        token: token,
        user: user,
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        batch: user.batch,
        section: user.section,
        user_name: user.user_name,
        user_image: user.user_image,
        user_type: user.user_type,
        password: user.password
      });
    } else {
      res.json({
        message: "Username and Password do not match or do not exist."
      });
    }
  } catch (e) {
    console.log(e);
  }

  //res.end(modelUser);
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

router.post("/getuser", (req, res) => {
  var user_name = req.body.user_name;
  var password = req.body.password;
  User.find({ user_name: user_name, password: password })
    .then(function(user) {
      var modelUser = JSON.stringify(user);
      console.log(modelUser);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(modelUser);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
