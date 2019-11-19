const mongoose = require("mongoose");

const PostScheme = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    content: {
      type: String,
      required: true
    },
    postTime: {
      type: Date,
      default: Date.now
    },
    isEdited: {
      type: Boolean,
      default: false
    }
  },
  { collection: "Posts" }
);

module.exports = mongoose.model("Post", PostScheme);
