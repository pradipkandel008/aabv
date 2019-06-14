const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    module_code: {
      type: String
      // required: true
    },
    module_name: {
      type: String
      //required:true
    },
    assignment_no: {
      type: String
      //required: true
    },
    assignment_desc: {
      type: String
    },
    assignment_deadline: {
      type: String
    },
    assignment_publish_date: {
      type: String
    },
    assignment_file: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Assignments = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignments;
