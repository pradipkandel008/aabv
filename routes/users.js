const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const fs = require("fs");
const User = require("../models/users");

//route for registering users
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

//route for getting users details after login
router.get("/me", auth, function(req, res) {
  res.send(req.user);
});

//route for counting total no of users
User.find({ user_type: "user" }).countDocuments(function(err, count) {
  router.get("/", function(req, res) {
    res.json(count);
  });
});

//route for counting total no of admins
User.find({ user_type: "admin" }).countDocuments(function(err, count) {
  router.get("/admins", function(req, res) {
    res.json(count);
  });
});

//route for user login
router.post("/login", async function(req, res) {
  try {
    const user = await User.checkCrediantialsDb(
      req.body.user_name,
      req.body.password
    );
    //const message = await user.message;
    if (user) {
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
});

//route for user logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//route for updating user for web
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

//route for updatinng user in Android
router.put("/updateUserAndroid/:id", function(req, res) {
  uid = req.params.id;
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

//route for getting all users
router.get("/getAllUser", (req, res) => {
  User.find({ user_type: "user" })
    .then(function(user) {
      res.send(user);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting all admins
router.get("/getAllAdmin", (req, res) => {
  User.find({ user_type: "admin" })
    .then(function(user) {
      res.send(user);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating user profile image for both Web and Android
router.put("/updateImage/:id", function(req, res) {
  id = req.params.id;
  if (req.body.user_image != null) {
    User.findById(id).then(user => {
      let path = user.user_image;
      fs.unlink(path, err => {
        if (err) console.log(err);
      });
    });
  }
  console.log(req.body.user_image);
  User.update(
    { _id: req.params.id },
    {
      $set: { user_image: req.body.user_image }
    }
  )
    .then(function(user) {
      res.status(201).json({
        message: "Upload Success"
      });
    })
    .catch(function(e) {
      res.status(422).json({
        message: "Unable to Update:" + e
      });
    });
});

module.exports = router;
