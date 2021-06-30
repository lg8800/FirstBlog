const express = require('express');
const Blog = require("../models/blog");
const User = require("../models/user");

const isAuth = require("../middleware/authenticate");

const router = express.Router();

router.get("/blog", isAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });  
    res.status(200).send({
      message: "Blog received",
      blogs,
    });
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blog receive failed!",
      blogs: null,
    });
  }
});

router.get("/blog/:blogId", isAuth, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    res.status(200).send({
      message: "Blog received",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blog receive failed!",
      blog: null,
    });
  }
});

router.post("/blog", isAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { message, title } = req.body;

    let imageUrl;
    
    if(req.files[0]) {
      console.log('image found');
      imageUrl = req.files[0].path;
    }

    if (!message || !title) {
      throw new Error("Field not valid"); 
    }

    const blog = new Blog({
      message,
      title,
      imageUrl,
      author: userId,
    });

    const result = await blog.save();
    res.status(201).send({
      message: "Blog created",
      blog: result,
    });
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blog creation failed!",
      blog: null,
    });
  }
});

router.get("/userBlogs", isAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({author: userId});
    if(!blogs) {
      throw new Error("Error in fetching blogs!");
    }
    console.log(blogs);
    res.status(200).send({
      message: "Success",
      blogs
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blogs not found!",
      blog: null,
    });
  }
})

module.exports = router;