const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String
      //required: true
    },
    last_name: {
      type: String
      //required: true
    },
    email: {
      required: true,
      type: String,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    batch: {
      type: String
    },
    section: {
      type: String
    },
    user_name: {
      type: String
      //required: true
    },
    password: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

/* userSchema.statics.myFirst = function() {
  console.log("this is my first function");
}; */

/* userSchema.statics.authStatic = function(user_name, password) {
  if (user_name == "admin" && password == "admin") {
    console.log("Welcome Admin");
  } else {
    console.log("Invalid Username or Password");
  }
}; */

/* userSchema.statics.authDynamic = function(user_name, password) {
  if (user_name == "admin" && password == "admin") {
    console.log("Welcome Admin");
  } else {
    console.log("Invalid Username or Password");
  }
}; */
//step 2
userSchema.statics.checkCrediantialsDb = async (user, password) => {
  const user1 = await User.findOne({ user_name: user, password: password });
  console.log(user1);
  return user1;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  console.log(token);
  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
