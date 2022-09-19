const express = require("express");
const blogModel = require("../blog/blogModel");
const User = require("../user/userModel");

exports.createBlog = async (request, response) => {
  const { id } = request.headers;
  const findUser = await User.findById(id);
  const { title, article, author, images } = request.body;
  try {
    if (findUser) {
      const blog = new blogModel({ title, article, author, images });
      await blog.save();
      return response.status(201).send({
        status: true,
        message: "Blog has been succesfully posted",
        newBlog: blog,
      });
    } else {
      return response.status(401).send({
        status: false,
        message: "Be like say u be bot",
      });
    }
  } catch (err) {
    return response.status(401).send({
      status: false,
      message: "Invalid inputs",
    });
  }
};

exports.updateBlog = async (request, response) => {
  const { id } = request.headers;
  const findBlog = await blogModel.findById(id);
  findBlog.title = request.body.title;
  findBlog.article = request.body.article;
  await findBlog.save();
  return response.status(201).send({
    status: true,
    message: "Blog has been updated successfully",
    updatedBlog: findBlog,
  });
};

exports.deleteBlog = async (request, response) => {
  const { id } = request.query;
  const findBlog = await blogModel.findByIdAndDelete(id);
  if (findBlog) {
    return response.status(201).send({
      status: true,
      message: "Blog deleted successfully",
    });
  } else {
    return response.status(409).send({
      status: false,
      message: "blog post not found",
    });
  }
};

exports.getOneBlog = async (request, response) => {
  const { id } = request.params;
  const findOneBlog = await blogModel.findById({ id });
  if (findOneBlog) {
    return response.status(200).send({
      status: true,
      message: "Blog found",
      OneBlog: findOneBlogs,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "Blog not found",
    });
  }
};

exports.getAllBlogs = async (request, response) => {
  const findAllBlogs = await blogModel.find();
  return response.status(200).send({
    status: true,
    message: "All blogs created",
    AllBlogs: findAllBlogs,
  });
};
