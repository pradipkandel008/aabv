const mongoose = require("mongoose");
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
    user_name: {
      type: String
      //required: true
    },
    password: {
      type: String
      //required: true
    }
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

userSchema.statics.authDynamic = function(user_name, password) {
  if (user_name == "admin" && password == "admin") {
    console.log("Welcome Admin");
  } else {
    console.log("Invalid Username or Password");
  }
};

const Users = mongoose.model("User", userSchema);
module.exports = Users;
