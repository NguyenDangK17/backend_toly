const mongoose = require("mongoose");

const premiumSchema = mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    premiumType: {
      type: String,
      enum: ['free', 'premium_month', 'premium_year'],
      required: true,
      default: "free",
    },
    numOfNavigate: {
      type: Number,
      required: true,
      default: 5,
    },
    numOfCreateGroupChat: {
      type: Number,
      required: true,
      default: 1,
    },
    subscriptionDate: {
      type: Date,
      // required: true,
      default: null,
    },
    subscriptionExpire: {
      type: Date,
      // required: true,
      default: null,
    },
  },
  { timestamps: true }
);

const Premium = mongoose.model("Premium", premiumSchema);

module.exports = Premium;