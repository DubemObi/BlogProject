const express = require("express");
const mongoose = require("mongoose");
const blogModel = require("./blogModel");
const User = require("../model")

const app = express();
const port = 4001;

const router = express.Router()

// // middleware that is specific to this router
// // define the home page route
// router.post('/blog', (req, res) => {
//   res.send('Birds home page')
// })
// // define the about route
// router.get('/about', (req, res) => {
//   res.send('About birds')
// }

app.use(express.json());


router.post('/blog', async (request, response) => {
    const {author} = request.body;
    //const userId = requestBody.Id;
    const findUser = await User.findOne(author)
    if (findUser){
    const blog = new blogModel(author);
    await blog.save();
      return response.status(201).send({
        status: true,
        message: "Blog has been succesfully posted",
        newBlog: blog
      }
      );
    }else {
        return response.status(401).send({
            status: false,
            message: "Be like say u be bot"
        })
    }
    })
    
  
  router.put('/blog', async (request, response) => {
    const findBlog = await blogModel.findById(request.body.Id);
     findBlog.reqbody = request.body.title
     findBlog.article = request.body.article
     await findBlog.save()
      return response.status(201).send({
        status: true,
        message: "Blog has been updated successfully",
        updatedBlog: findBlog})
      // return response.status(404).send({
      //   status: false,
      //   message: "user not found",
      // });
  })

  router.delete('/blog', async (request, response) => {
    const requestBody = request.body;
    const findBlog = await blogModel.findOneAndDelete({ title: requestBody.title });
    if (findBlog) {
      return response.status(201).send({
        status: true,
        message: "User deleted successfully",
        deletedBlog: findBlog,
      });
    } else {
      return response.status(409).send({
        status: false,
        message: "this blog post no dy again",
      });
    }
  }),


  router.get('/blog', async (response) => {
    const findAllBlogs = await blogModel.find();
    return response.status(201).send({
      status: true,
      message: "All accounts created",
      AllBlogs: findAllBlogs,
    });
  })

module.exports = router