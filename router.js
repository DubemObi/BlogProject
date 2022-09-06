const express = require("express");
const controller = require("./user/user-controller");
const controllerB = require("./blog/blog-controller");

const router = express.Router();

const { createUser, getUser, updateUser, deleteUser } = controller;

const { createBlog, getUserB, updateUserB, deleteUserB } = controllerB;

router.route("/blog").get(getUserB).post(createBlog).put(updateUserB).delete(deleteUserB);

router.route("/user").get(getUser).post(createUser).put(updateUser).delete(deleteUser);

module.exports = router;






// const express = require("express");
// const blogModel = require("./blogModel");
// const User = require("../model")
// const controller = require("../controller")
// const app = express();
// const port = 4001;
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
// const router = express.Router()


// router.post('/blog', controller.createBlog), 
    
  
//   router.put('/blog', async (request, response) => {
//     const findBlog = await blogModel.findById(request.body.Id);
     
//      findBlog.reqbody = request.body.title
//      findBlog.article = request.body.article
//      await findBlog.save()
//       return response.status(200).send({
//         status: true,
//         message: "Blog has been updated successfully",
//         updatedBlog: findBlog})
//   })

//   router.delete('/blog', async (request, response) => {
//     const requestBody = request.body;
//     const findBlog = await blogModel.findById({ id: requestBody.id });
//     if (findBlog) {
//       return response.status(200).send({
//         status: true,
//         message: "Blog deleted successfully",
//         deletedBlog: findBlog,
//       });
//     } else {
//       return response.status(409).send({
//         status: false,
//         message: "this blog post no dy again",
//       });
//     }
//   }),


//   router.get('/blog', async (response) => {
//     const findAllBlogs = await blogModel.find();
//     return response.status(200).send({
//       status: true,
//       message: "All accounts created",
//       AllBlogs: findAllBlogs,
//     });
//   })

// module.exports = router