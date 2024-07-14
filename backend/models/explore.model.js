const mongoose = require("mongoose");

const exploreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    area: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    priceRange: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    position: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true
      }
    },
  },
  { timestamps: true }
);

const Explore = mongoose.model("Explore", exploreSchema);

module.exports = Explore;
