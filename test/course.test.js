const Course = require("../models/courses");
const moment = require("moment");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/collegeAppDB_test";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Course Schema Test", () => {
  // the code below is for insert testing
  it("Add Course Testing", () => {
    const course = {
      course_name: "BIT",
      course_duration: "3 years",
      course_price: "Rs 5 Lakhs",
      course_modules: "Programming, Database",
      course_desc: "A very popular course all over the world",
      course_image: ""
    };
    return Course.create(course).then(result => {
      expect(result.course_name).toEqual("BIT");
    });
  });
  //the code below is for selecting feedback
  it("Select Course Testing", async () => {
    return Course.findOne({
      _id: "5d21e0a83c3e488f6bece826"
    }).then(result => {
      expect(result.course_name).toEqual("BIT");
    });
  });
  // the code below is for delete testing
  it("Delete Course Testing", async () => {
    const status = await Course.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });

  it("Update Course Testing", async () => {
    const course = await Course.findOneAndUpdate(
      { _id: Object("5d21e056fd51c29b43650223") },
      {
        $set: {
          course_name: "CIT"
        }
      }
    );
    if (course) {
      return await Course.findOne({
        _id: "5d21e056fd51c29b43650223"
      }).then(result => {
        expect(result.course_name).toEqual("CIT");
      });
    }
  });
});
