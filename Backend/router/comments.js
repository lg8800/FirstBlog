const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const Blog = require("../models/blog");

const isAuth = require("../middleware/authenticate");

const router = express.Router();

router.get("/comments/:blogId", isAuth, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      throw new Error("comments get error");
    }
    const comments = await Comment.find({ blogId: blogId }).populate("userId");
    console.log(comments);
    res.status(200).send({
      message: "Comments Found",
      comments: comments,
    });
  } catch (e) {
    res.status(404).send({
      message: "Error in retrieving comments",
    });
  }
});

router.post("/comments/", isAuth, async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const userId = req.userId;
    const comment = req.body.comment;
    if (!blogId) {
      res.status(404).send("Comment Post err");
    }
    const comm = new Comment({
      blogId,
      userId,
      comment,
    });
    const result = await comm.save();
    if (result) {
      res.status(201).send({
        message: "Comment posted!",
        result: result,
      });
    }
  } catch (error) {
    res.status(501).send({
      error: "Error in posting error",
    });
  }
});

router.patch("/comments/:commentId", isAuth, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userId;
    const blogId = req.body.blogId
    const text = req.body.comment;
    if (!blogId) {
      throw new Error("comments update error");
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found!");
    }
    if(userId.toString() != comment.userId.toString()) {
      throw new Error("You can only edit your comments!");
    }
    comment.set({ comment: text });
    comment.save();
    console.log(comment);
    res.status(200).send({
      message: "Comments Updated",
      comment: comment,
    });
  } catch (e) {
    console.log(e.message);
    console.log("Not found error");
    res.status(404).send({
      message: e.message,
    });
  }
});

router.delete("/comments/:commentId", isAuth, async (req, res)   => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userId;
    const comment = await Comment.findById(commentId);
    if(!comment) {
      throw new Error("Comment not found!");
    }
    if(userId.toString() !== comment.userId.toString()) {
      throw new Error("You can only delete your comments");
    }
    const result = await Comment.findByIdAndDelete(commentId);
    if(!result) {
      throw new Error("Error in deleting comment");
    }
    res.status(200).send({
      comment: comment,
      message: "Comment deleted"
    });
  } 
  catch (error) {
    console.log(error);
    res.status(404).send({
      message: error.message
    });  
  }
});

module.exports = router;