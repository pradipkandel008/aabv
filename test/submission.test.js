const Submission = require("../models/submissions");
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

describe("Submission Schema Test", () => {
  // the code below is for insert testing
  it("Add Submission Testing", () => {
    const submission = {
      user_id: "5d1f60beaad5c908cb3ecf0a",
      assignment_id: "5d21d8b16595299423f28a7c",
      assignment_title: "160383_PradipKandel_WEB",
      assignment_links: "www.github.com/pradipkandel008",
      assignment_file_user: "",
      assignment_submitted_date: Date.now(),
      assign_id: "5d21d8b16595299423f28a7c",
      u_id: "5d1f60beaad5c908cb3ecf0a"
    };
    return Submission.create(submission).then(result => {
      expect(result.assignment_title).toEqual("160383_PradipKandel_WEB");
    });
  });
  //the code below is for selecting feedback
  it("Select Submission Testing", async () => {
    return Submission.findOne({
      _id: "5d21e3302a0a679aa730a409"
    }).then(result => {
      expect(result.assignment_title).toEqual("160383_PradipKandel_WEB");
    });
  });
  // the code below is for delete testing
  it("Delete Submission Testing", async () => {
    const status = await Submission.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });

  it("Update Submission Testing", async () => {
    const submission = await Submission.findOneAndUpdate(
      { _id: Object("5d21e302f2f83d9f13850958") },
      {
        $set: {
          assignment_title: "160383_Testing"
        }
      }
    );
    if (submission) {
      return await Submission.findOne({
        _id: "5d21e302f2f83d9f13850958"
      }).then(result => {
        expect(result.assignment_title).toEqual("160383_Testing");
      });
    }
  });
});
