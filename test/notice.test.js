const Notice = require("../models/notices");
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

describe("Notice Schema Test", () => {
  // the code below is for insert testing
  it("Add Notice Testing", () => {
    const notice = {
      notice_title: "Holiday Notice",
      notice_subject: "Holiday due to strike",
      notice_desc: "There will be no classes on 19 July 2019 due to strike",
      notice_date: moment()
    };
    return Notice.create(notice).then(result => {
      expect(result.notice_title).toEqual("Holiday Notice");
    });
  });
  //the code below is for selecting feedback
  it("Select Notice Testing", async () => {
    return Notice.findOne({
      _id: "5d21de953a3c7d72ab94a538"
    }).then(result => {
      expect(result.notice_title).toEqual("Holiday Notice");
    });
  });
  // the code below is for delete testing
  it("Delete Notice Testing", async () => {
    const status = await Notice.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });

  it("Update Notice Testing", async () => {
    const notice = await Notice.findOneAndUpdate(
      { _id: Object("5d21de128b200a7aa7246a78") },
      {
        $set: {
          notice_title: "Assignment Notice"
        }
      }
    );
    if (notice) {
      return await Notice.findOne({
        _id: "5d21de128b200a7aa7246a78"
      }).then(result => {
        expect(result.notice_title).toEqual("Assignment Notice");
      });
    }
  });
});
