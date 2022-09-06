const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const blogjs = require('./router')
const app = express();
app.use(express.json()); //middleware comes before route.
const port = 4001;
app.use('/', blogjs)

mongoose.connect(process.env.mongoDB);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
