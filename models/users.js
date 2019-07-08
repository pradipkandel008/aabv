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
      type: String
    },
    gender: {
      type: String
    },
    batch: {
      type: String
    },
    section: {
      type: String
    },
    user_image: {
      type: String
    },
    user_name: {
      type: String
    },
    password: {
      type: String
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
  const user1 = await User.findOne({ email: user, password: password });
  if (user1) {
    return user1;
  }
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "collegeapp", {
    expiresIn: "10m"
  });
  console.log(token);
  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
