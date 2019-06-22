const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    module_code: {
      type: String
      // required: true
    },
    module_name: {
      type: String
      //required: true
    },
    topic1: {
      type: String
      //required: true
    },
    topic2: {
      type: String
      //required: true
    },

    topic3: {
      type: String
      //required: true
    },
    topic4: {
      type: String
    },
    topic5: {
      type: String
    },
    topic6: {
      type: String
    },
    topic7: {
      type: String
    },
    topic8: {
      type: String
    },
    topic9: {
      type: String
    },
    topic10: {
      type: String
    },
    topic11: {
      type: String
    },
    topic12: {
      type: String
    },
    topic13: {
      type: String
    },
    topic14: {
      type: String
    },
    topic15: {
      type: String
    },
    topic16: {
      type: String
    },
    topic17: {
      type: String
    },
    topic18: {
      type: String
    },
    topic19: {
      type: String
    },
    topic20: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
