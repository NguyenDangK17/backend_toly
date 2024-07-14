const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;