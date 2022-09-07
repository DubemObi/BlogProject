const { application } = require("express");
const express = require("express");
//const mongoose = require("mongoose");
//const blogModel = require("../blog/blogModel");
const User = require("../user/userModel")

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
    }catch (error) {
      return response.status(404).send({
          status: false,
          message: "invalid email"
      })   
    }
}

exports.updateUser = async (request, response) => {
    const findUser = await User.findById(request.body.Id);
     findUser.username = request.body.username
     findUser.email = request.body.email
     findUser.password = request.body.password
     await findUser.save()
      return response.status(200).send({
        status: true,
        message: "Account has been updated successfully",
        updatedUser: findUser})
}

exports.getUser = async (request, response) => {
    const findAllUsers = await User.find();
    return response.status(200).send({
      status: true,
      message: "All accounts created",
      AllUsers: findAllUsers,
    });
}

exports.deleteUser = async (request, response) => {
    const {id} = request.query
    console.log(id)
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
}







