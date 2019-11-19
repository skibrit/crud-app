const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    regDate: {
      type: Date,
      default: Date.now()
    },
    lastLoginTime: {
      type: Date,
      default: Date.now()
    }
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", UserScheme);
