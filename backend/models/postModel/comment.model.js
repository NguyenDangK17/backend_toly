const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    commentator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      required: false,
    },
  }, { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;