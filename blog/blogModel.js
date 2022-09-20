const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    maxlength: 25,
  },
  article: {
    type: String,
    required: [true, "Please type your article"],
    minlength: [100, "Minimum article length is 100 characters"],
    maxlength: 600,
  },
  author: {
    type: String,
    required: [true, "Enter your name"],
    maxlength: 25,
  },
  images: {
    type: String,
    required: [true, "Enter image URL"],
  },
});

module.exports = mongoose.model("blog", blogSchema);
