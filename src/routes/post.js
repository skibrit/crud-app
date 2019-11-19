const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");

// @Validation Rules
let validationRules = [
  check("content", "Post Content is required").not().isEmpty()
];

// @ROUTE : POST api/post
// @DESC  : This route will add or update post of a user in the database
// @Access : Private
router.post(
  "/:postId?",
  [authMiddleware, validationRules],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id: userID } = req.user;
      const { content } = req.body;
      const { postId } = req.params;

      let post =
        postId && (await Post.findOne({ _id: postId, postedBy: userID }));

      if (post) {
        //update existing post
        post = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $set: {
              content: content,
              isEdited: true
            }
          },
          { new: true }
        );
      } else {
        //create a new post
        post = new Post({ content, postedBy: userID });
        await post.save();
      }
      res.json(post);
    } catch (err) {
      console.log(err);
      if (err.kind == "ObjectId") {
        return res.status(404).send("Not found");
      }
      res.status(500).send("Server error");
    }
  }
);

// @ROUTE : GET api/post/:sortOrder?
// @DESC  : This route returns all the post in the database
// @Access : Public
router.get("/", async (req, res) => {
  try {
    const { sort } = req.query;
    const sortOrder = sort == "asc" ? 1 : -1;
    const posts = await Post.find().populate("postedBy", ["username"]).sort({
      postTime: sortOrder
    });
    res.json(posts);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @ROUTE : GET api/post/:id
// @DESC  : This route returns a single post based on the id
// @Access : Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("postedBy", [
      "username"
    ]);
    if (!post) {
      return res.status(404).send("Not found");
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).send("Not found");
    }
    return res.status(500).send("Server error");
  }
});

// @ROUTE : DELETE api/post
// @DESC  : This route will delete a post from database
// @Access : PRIVATE
router.delete("/:id", [authMiddleware], async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: postId } = req.params;
    await Post.findOneAndDelete({ _id: postId, postedBy: userId });
    res.json({ msg: "Delete successful" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).send("Not found");
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
