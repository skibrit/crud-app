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

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to post route" });
});

module.exports = router;
