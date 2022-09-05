const express = require("express");
const mongoose = require("mongoose");
const blogModel = require("./blog stuff/blogModel");
const User = require("./model")


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