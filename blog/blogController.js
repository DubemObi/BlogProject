const express = require("express");
//const mongoose = require("mongoose");
const blogModel = require("../blog/blogModel");
const User = require("../user/userModel")

exports.createBlog = async (request, response) => {
    const {id} = request.headers
    const findUser = await User.findById(id)
    const  {title, article, author, images} = request.body
    if (findUser){
    const blog = new blogModel({title, article, author, images});
        console.log({title, article, author, images})
    await blog.save();
      return response.status(201).send({
        status: true,
        message: "Blog has been succesfully posted",
        newBlog: blog
      })
    }else {
        return response.status(401).send({
            status: false,
            message: "Be like say u be bot"
        })
    }
}

exports.updateBlog = async (request, response) => {
    const {id} = request.headers
    const findBlog = await blogModel.findById(id);
     findBlog.title = request.body.title
     findBlog.article = request.body.article
     await findBlog.save()
      return response.status(201).send({
        status: true,
        message: "Blog has been updated successfully",
        updatedBlog: findBlog})
  }

  exports.deleteBlog = async (request, response) => {
    const {id} = request.params
    const findBlog = await blogModel.findByIdAndDelete(id);
    if (findBlog) {
      return response.status(201).send({
        status: true,
        message: "Blog deleted successfully"
      });
    } else {
      return response.status(409).send({
        status: false,
        message: "blog post not found",
      });
    }
  }

exports.getBlog = async (request, response) => {
    const findAllBlogs = await blogModel.find();
    return response.status(201).send({
      status: true,
      message: "All accounts created",
      AllBlogs: findAllBlogs,
    });
  }



