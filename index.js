const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model");
require("dotenv/config");

const app = express();
const port = 4001;

app.use(express.json());

app
  .route("/user")
  .post(async (request, response) => {
    const requestBody = request.body;
    const findEmail = await User.findOne({ email: requestBody.email });
    if (findEmail) {
      return response.status(409).send({
        status: false,
        message: "Email already exists",
      });
    } else {
      const user = new User(requestBody);

      await user.save();
      return response.status(200).send({
        status: true,
        message: "Account has been  created successfully",
        newUser: user,
      });
    }
  })
  .get(async (response) => {
    const findAllUsers = await User.find();
    return response.status(201).send({
      status: true,
      message: "All accounts created",
      AllUsers: findAllUsers,
    });
  })
  .delete(async (request, response) => {
    const reqBody = request.body;
    const findUser = await User.findOneAndDelete({ email: reqBody.email });
    if (findUser) {
      return response.status(201).send({
        status: true,
        message: "User deleted successfully",
        deletedUser: findUser,
      });
    } else {
      return response.status(409).send({
        status: false,
        message: "User not found",
      });
    }
  });
app.route("/user/login").post(async (request, response) => {
  const reqBody = request.body;
  const findUser = await User.findOne({ email: reqBody.email });
  if (findUser && findUser.password === reqBody.password) {
    return response.status(201).send({
      status: true,
      message: "Login successful",
      user: findUser,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "Invalid User datails",
    });
  }
});
mongoose.connect(process.env.mongoDB);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
