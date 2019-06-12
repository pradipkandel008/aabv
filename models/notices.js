const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    notice_title: {
      type: String
      // required: true
    },
    notice_subject: {
      type: String
      //required:true
    },
    notice_desc: {
      type: String
      //required: true
    },
    notice_date: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Notices = mongoose.model("Notice", noticeSchema);
module.exports = Notices;
