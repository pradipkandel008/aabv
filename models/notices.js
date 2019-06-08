const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    notice_type: {
      type: String
      // required: true
    },
    notice_desc: {
      type: String
      //required: true
    }
  },
  {
    timestamps: true
  }
);

const Notices = mongoose.model("Notice", noticeSchema);
module.exports = Notices;
