const { request } = require("express");
const Blog = require("../blog/blogModel")
const Project = require("../user/userModel")

exports.createBlog = async (request, response) => {
    const id = request.body.id;
    const confirmId = await Project.findById(id);
    const { title, username, article } = request.body;
   
    if(confirmId){
        const create = await Blog({ id, title, username, article });
        create.save(); 
        return response.status(200).send({
            status : true,
            meassage : "Successfully Created a Blog"
        });
    }else{
        return response.status(404).send({
            status : false,
            meassage : "Please enter valid details to upload a blog else create a new account"
        });
    } 
}

exports.getUserB = async (request, response) => {
    const blogs = await Blog.find();
    response.status(200).json({
        status : true,
        data : {
            blogs
        }
    })
}

exports.updateUserB = async (request, response) => {
    const {id} = request.headers;
    const reset = await Blog.findById(id);
    

    if(reset){
        reset.title = request.body.title;
        reset.username = request.body.username;
        reset.article = request.body.article;
        reset.save();
        return response.status(201).send({
            status : true,
            message : "Post successfully changed."
        })
    }else {
        return response.status(404).send({
            StatusCode : 404,
            status : false,
            message : "Invalid input"
        })
    }

}

exports.deleteUserB = async (request, response) => {
    const {id} = request.query;
    const delBlog = await Blog.findByIdAndDelete(id);

    if(delBlog) {
        return response.status(201).send({
            status : true,
            message : "Post successfully deleted"
        });
    }else{
        return response.status(404).send({
            status : false,
            message : "Post cannot be fetched"
        })
    }

}