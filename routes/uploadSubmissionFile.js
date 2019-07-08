//for android only

var express = require("express");
var multer = require("multer");
var path = require("path");

var submissionFile;
var storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    submissionFile = "submission" + Date.now() + file.originalname;
    callback(null, submissionFile);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }
});

var router = express.Router();

//route for uploading submission file to folder for android only
router
  .route("/assignmentSubmit")
  .post(upload.single("assignment_file_user"), (req, res) => {
    //console.log(ImagefileName);
    var resPonseFilename = JSON.stringify({
      user_file: submissionFile
    });
    //console.log(resPonseFilename);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        {
          user_file: submissionFile
        },
        null,
        3
      )
    );
  });

module.exports = router;
