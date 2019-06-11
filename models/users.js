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
    user_type: {
      type: String
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

userSchema.statics.checkCrediantialsDb = async (user, password) => {
  const user1 = await User.findOne({ user_name: user, password: password });
  if (user1) {
    console.log(user1);
    return user1;
  } else {
    console.log("auth failed");
  }
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "collegeapp");
  console.log(token);
  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
