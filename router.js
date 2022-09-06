const express = require("express");
const userController = require("./user/userController")
const blogController = require("./blog/blogController")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const router = express.Router()

const {createBlog, getBlog, updateBlog, deleteBlog} = blogController 
router.route("/blog").post(createBlog).get(getBlog).put(updateBlog).delete(deleteBlog)

const {createUser, getUser, updateUser, deleteUser} = userController 
router.route("/user").post(createUser).get(getUser).put(updateUser).delete(deleteUser)

module.exports = router



