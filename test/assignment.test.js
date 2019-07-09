const Assignment = require("../models/assignments");
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

describe("Assignment Schema Test", () => {
  // the code below is for insert testing
  it("Add Assignment Testing", () => {
    const assignment = {
      module_code: "STW307CR",
      module_name: "Interactive Pervaise Computing",
      assignment_no: "01",
      assignment_desc: "Description in file",
      assignment_deadline: "2019-Jul-19",
      assignment_file: "",
      assignment_publish_date: moment()
    };
    return Assignment.create(assignment).then(result => {
      expect(result.assignment_no).toEqual("01");
    });
  });
  //the code below is for selecting feedback
  it("Select Assignment Testing", async () => {
    return Assignment.findOne({
      _id: "5d21dc64105d35996b67846e"
    }).then(result => {
      expect(result.assignment_no).toEqual("01");
    });
  });
  // the code below is for delete testing
  it("Delete Assignment Testing", async () => {
    const status = await Assignment.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });

  it("Update Assignment Testing", async () => {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: Object("5d21d8b16595299423f28a7") },
      {
        $set: {
          assignment_no: "05"
        }
      }
    );
    if (assignment) {
      return await Assignment.findOne({
        _id: "5d21d8b16595299423f28a7c"
      }).then(result => {
        expect(result.assignment_no).toEqual("05");
      });
    }
  });
});
