const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
    max: 600,
  },
  author: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("blog", blogSchema);
