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

UserScheme.pre("remove", async function() {
  await this.model("Post").deleteMany({ postedBy: this._id });
});

module.exports = mongoose.model("User", UserScheme);
