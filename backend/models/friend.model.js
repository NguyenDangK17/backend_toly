const mongoose = require("mongoose");

const friendSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      required: true,
      enum: [
        1, // pending
        2, // accept
        3, // decline
      ]
    }
  }, { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;