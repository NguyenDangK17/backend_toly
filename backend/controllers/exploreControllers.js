const asyncHandler = require("express-async-handler");
const Explore = require("../models/explore.model.js");

const getExploreList = asyncHandler(async (req, res) => {
  try {
    const results = await Explore.find();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createExploreList = asyncHandler(async (req, res) => {
  try {
    // const {token} = req.headers;
    const newExplore = await Explore.create(req.body);
    res.status(200).json(newExplore);
  } catch (error) {
    console.error("Error in createExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateExploreList = asyncHandler(async (req, res) => {
  try {
    const exporeId = req.params.id;
    const updateExplore = await Explore.findByIdAndUpdate(exporeId, {
      name: "Trieu Tien",
    });
    res.status(200).json(updateExplore);
  } catch (error) {
    console.error("Error in updateExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteExploreList = asyncHandler(async (req, res) => {
  try {
    const explore = await Explore.findByIdAndDelete(req.params.id);
    res.status(200).json(explore);
  } catch (error) {
    console.error("Error in deleteExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getExploreByName = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const results = await Explore.find({ name: new RegExp(name, "i") });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getExploreByName: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getExploreById = asyncHandler(async (req, res) => {
  try {
    const explore = await Explore.findById(req.params.id);
    if (!explore) {
      return res.status(404).json({ error: "Explore not found" });
    }
    res.status(200).json(explore);
  } catch (error) {
    console.error("Error in getExploreById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = {
  getExploreList,
  createExploreList,
  updateExploreList,
  deleteExploreList,
  getExploreByName,
  getExploreById,
};
