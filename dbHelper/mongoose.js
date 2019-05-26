const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/collegeAppDB";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

connect.then(
  db => {
    console.log(
      "Connected to mongodb server at port 27017 with db name collegeAppDB"
    );
  },
  err => {
    console.log(err);
  }
);
