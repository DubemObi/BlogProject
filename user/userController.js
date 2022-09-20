const { application } = require("express");
const express = require("express");
//const mongoose = require("mongoose");
//const blogModel = require("../blog/blogModel");

const User = require("../user/userModel");

const errorHandler = (err) => {
  console.log(err.message);
  let error = {
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    username: "",
    profileImage: "",
  };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

exports.createUser = async (request, response) => {
  const requestBody = request.body;
  const findEmail = await User.findOne({ email: requestBody.email });
  try {
    if (findEmail) {
      return response.status(409).send({
        status: false,
        message: "Email already exists",
      });
    } else {
      const user = new User(requestBody);
      await user.save();
      return response.status(201).send({
        status: true,
        message: "Account has been  created successfully",
        newUser: user,
      });
    }
  } catch (error) {
    const err = errorHandler(error);
    return response.status(404).json({ err });
  }
};

exports.updateUser = async (request, response) => {
  try {
    const findUser = await User.findById(request.body.Id);
    if (findUser) {
      findUser.username = request.body.username;
      findUser.email = request.body.email;
      findUser.password = request.body.password;
      await findUser.save();
      return response.status(200).send({
        status: true,
        message: "Account has been updated successfully",
        updatedUser: findUser,
      });
    } else {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    const err = errorHandler(error);
    return response.status(400).json({ err });
  }
};

exports.getUser = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneUser = await User.findById(id);

    if (!findOneUser) {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "User found",
        User: findOneUser,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};

exports.getAllUsers = async (request, response) => {
  const findAllUsers = await User.find();
  return response.status(200).send({
    status: true,
    message: "Users found",
    AllUsers: findAllUsers,
  });
};

exports.deleteUser = async (request, response) => {
  const { id } = request.query;
  const findUser = await User.findByIdAndDelete(id);
  if (findUser) {
    return response.status(200).send({
      status: true,
      message: "User deleted successfully",
      deletedUser: findUser,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "User not found",
    });
  }
};
