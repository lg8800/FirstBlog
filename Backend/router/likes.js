const express = require("express");
const Like = require("../models/like");
const User = require("../models/user");
const Blog = require("../models/blog");

const isAuth = require("../middleware/authenticate");

const router = express.Router();

router.get("/like/isliked/:blogId", isAuth, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.userId;
    let isLiked;
    if (!blogId) {
      throw new Error("isLiked ERRRRRR");
    }
    const count = await Like.find({ blogId: blogId, userId: userId }).countDocuments();
    res.status(200).send({
      isLiked: count > 0,
      message: "sahi hai sb",
    });
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Like false!",
      isLiked: false,
    });
  }
});

router.get("/like/likes/:blogId", isAuth, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      throw new Error("get ERRRRRRRR");
    }
    const count = await Like.find({ blogId: blogId }).countDocuments();
    res.status(201).send({
      message: "Mil gya count",
      count
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "ERRR",
      count: 0,
    });
  }
});

router.post("/like/like", isAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { blogId } = req.body;

    if (!blogId) {
      throw new Error("post ERRRRRR");
    }

    const like = new Like({
      userId,
      blogId
    });

    const result = await like.save();
    res.status(201).send({
      message: "Blog Liked",
      like: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blog like failed!",
      like: null,
    });
  }
});

router.delete("/like/unlike/:blogId", isAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId;
    if (!blogId) {
      throw new Error("unlike ERRRRRR");
    }
    const like = await Like.findOneAndDelete({blogId: blogId, userId: userId});
    res.status(201).send({
      message: "Blog Unliked",
      like: like,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Blog unlike failed!",
      like: null,
    });
  }
});

module.exports = router;
