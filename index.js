const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});
const router = require("./router");

app.use(express.json()); 

app.use('/', router)

mongoose.connect(process.env.mongoDB);
app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});


