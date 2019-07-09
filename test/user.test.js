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
