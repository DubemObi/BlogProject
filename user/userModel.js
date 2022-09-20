const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Enter an email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Minimum password length is 6 characters and should contain Upper and lowercase and Special characters ",
    ],
  },
  phoneNo: {
    type: String,
    required: [true, "Enter a phone number"],
    maxlength: 14,
  },
  username: {
    type: String,
    required: [true, " enter your username"],
    unique: true,
    maxlength: 50,
  },
  profileImage: {
    type: String,
    required: [true, "Enter image URL"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", userSchema);
