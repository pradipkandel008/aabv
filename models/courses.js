const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    course_name: {
      type: String
      // required: true
    },
    course_duration: {
      type: String
      //required: true
    },
    course_price: {
      type: String
      //required: true
    },
    course_modules: {
      type: String
      //required: true
    },

    course_desc: {
      type: String
      //required: true
    },
    course_image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Courses = mongoose.model("Course", courseSchema);
module.exports = Courses;
