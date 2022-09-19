const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 25,
  },
  article: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 600,
  },
  author: {
    type: String,
    required: true,
    maxlength: 25,
  },
  images: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("blog", blogSchema);
