const Feedback = require("../models/feedbacks");
const User = require("../models/users");
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
    const feedback = await Feedback.findOne({
      _id: "5d1f81394248d81e0b8095fd"
    }).then(result => {
      return expect(result.feedback).toEqual("I am very proud of this webpage");
    });
  });
  // the code below is for delete testing
  it("Delete Feedback Testing", async () => {
    const status = await Feedback.remove({ _id: "5d1f7f0f5054ff220fcfbd09" });
    return expect(status.ok).toBe(1);
  });

  it("Update Feedback Testing", async () => {
    const feedback = await Feedback.update(
      { _id: "5d1f7fb37979020f97ebb18c" },
      {
        $set: {
          feedback: "this is newly 4 updated feedback"
        }
      }
    );
    if (feedback) {
      const feedback2 = await Feedback.findOne({
        _id: "5d1f7fb37979020f97ebb18c"
      }).then(result => {
        return expect(result.feedback).toEqual(
          "this is newly 4 updated feedback"
        );
      });
    }
  });
});

describe("User Schema Test", () => {
  // the code below is for insert testing
  it("User Register Testing", () => {
    const user = {
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      gender: "male",
      batch: "19",
      section: "D",
      user_image: "",
      user_name: "user",
      password: "user",
      user_type: "user"
    };
    return User.create(user).then(result => {
      expect(result.user_name).toEqual("user");
    });
  });
});
