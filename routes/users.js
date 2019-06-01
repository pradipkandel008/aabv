const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const auth = require("../middleware/auth");

const User = require("../models/users");

router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  //const user = User.myFirst();
  //const userAuth = User.authStatic("admin", "admin");
  const userAuth2 = User.authDynamic(email, password);
});

router.get("/test", middleware, function() {
  console.log("this is test URL");
});

router.post("/login22", async function(req, res) {
  const user = await User.checkCrediantialsDb(
    req.body.user_name,
    req.body.password
  );
  console.log(user);
  //const token = await user.generateAuthToken();
});

module.exports = router;
