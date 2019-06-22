const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enquireSchema = new Schema(
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
    phone: {
      type: String
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Enquire = mongoose.model("Enquire", enquireSchema);
module.exports = Enquire;
