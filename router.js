const express = require("express");
const userController = require("./user/userController");
const blogController = require("./blog/blogController");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router = express.Router();

const { createBlog, getAllBlogs, updateBlog, deleteBlog } = blogController;
router
  .route("/blog")
  .post(createBlog)
  //   .get(getOneBlog)
  .get(getAllBlogs)
  .put(updateBlog)
  .delete(deleteBlog);

const { getOneBlog } = blogController;
router.route("/user/:id").get(getOneBlog);

const { createUser, getAllUsers, updateUser, deleteUser } = userController;
router
  .route("/user")
  .post(createUser)
  .get(getAllUsers)
  .put(updateUser)
  .delete(deleteUser);

const { getUser } = userController;
router.route("/user/:id").get(getUser);

module.exports = router;
