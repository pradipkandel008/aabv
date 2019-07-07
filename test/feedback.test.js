const Feedback = require("../models/feedbacks");
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

describe("Feedback Schema Test", () => {
  // the code below is for insert testing
  it("Add Feedback Testing", () => {
    const feedback = {
      u_id: "5d0ccad9b7f2042bdba3902f",
      feedback: "I am very proud of this webpage"
    };
    return Feedback.create(feedback).then(result => {
      expect(result.feedback).toEqual("I am very proud of this webpage");
    });
  });
  //the code below is for selecting feedback
  it("Select Feedback Testing", async () => {
    return Feedback.findOne({
      _id: "5d1f81394248d81e0b8095fd"
    }).then(result => {
      expect(result.feedback).toEqual("I am very proud of this webpage");
    });
  });
  // the code below is for delete testing
  it("Delete Feedback Testing", async () => {
    const status = await Feedback.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });
});
