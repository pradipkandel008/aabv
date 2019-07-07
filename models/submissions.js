const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const User = require("./users");

const submissionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      // required: true
    },
    assignment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    },
    assignment_title: {
      type: String
      //required: true
    },
    assignment_links: {
      type: String
    },
    assignment_file_user: {
      type: String
    },
    assignment_submitted_date: {
      type: String
    },
    assign_id: {
      type: String
    },
    u_id: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Submissions = mongoose.model("Submission", submissionSchema);
module.exports = Submissions;
