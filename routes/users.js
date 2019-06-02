const express = require("express");
const router = express.Router();
//const middleware = require("../middleware/middleware");
const auth = require("../middleware/auth");

const User = require("../models/users");

router.post("/login22", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  //const user = User.myFirst();
  //const userAuth = User.authStatic("admin", "admin");
  const userAuth2 = User.authDynamic(email, password);
});

router.get("/auth-test", auth, function() {
  res.send("this is my private page");
  console.log("this is test URL");
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

module.exports = router;
