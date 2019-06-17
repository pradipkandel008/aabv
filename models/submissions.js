const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    user_id: {
      type: String
      // required: true
    },
    assignment_id: {
      type: String
      //required:true
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
    }
  },
  {
    timestamps: true
  }
);

const Submissions = mongoose.model("Submission", submissionSchema);
module.exports = Submissions;
