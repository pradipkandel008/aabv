const mongoose = require("./dbHelper/mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const userRoute = require("./routes/users");
const courseRoute = require("./routes/courses");
const uploadRoute = require("./routes/upload");
//const noticeRoute = require("./routes/notices");
//const assignmentRoute = require("./routes/assignments");

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//for handliing cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRoute);
app.use("/courses", courseRoute);
app.use("/uploads", uploadRoute);
//app.use("/notices", noticeRoute);
//app.use("/assignments", assignmentRoute);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

/* function generateToken() {
  const token = jwt.sign({ _id: "userid" }, "mysecretkey");
  console.log(token);
}

generateToken(); */
module.exports = app;
