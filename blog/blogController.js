const express = require("express");
const blogModel = require("../blog/blogModel");
const User = require("../user/userModel");

const errorHandler = (err) => {
  console.log(err.message);
  let error = {
    title: "",
    article: "",
    author: "",
    images: "",
  };

  if (err.message.includes("blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

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
    const error = errorHandler(err);
    return response.status(401).json({ error });
  }
};

exports.updateBlog = async (request, response) => {
  try {
    const { id } = request.headers;
    const findBlog = await blogModel.findById(id);
    if (findBlog) {
      findBlog.title = request.body.title;
      findBlog.article = request.body.article;
      await findBlog.save();
      return response.status(201).send({
        status: true,
        message: "Blog has been updated successfully",
        updatedBlog: findBlog,
      });
    } else {
      return response
        .status(404)
        .json({ status: false, message: "Blog not found" });
    }
  } catch (error) {
    const err = errorHandler(error);
    return response.status(404).json({ err });
  }
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
  const id = request.params.id;
  const findOneBlog = await blogModel.findById(id);
  if (findOneBlog) {
    return response.status(200).send({
      status: true,
      message: "Blog found",
      OneBlog: findOneBlog,
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
