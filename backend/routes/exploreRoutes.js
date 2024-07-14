const express = require("express");
const {
  createExploreList,
  deleteExploreList,
  getExploreList,
  updateExploreList,
  getExploreByName,
  getExploreById,
} = require("../controllers/exploreControllers");

const router = express.Router();

router.get("/", getExploreList);

router.get("/:id", getExploreById);

router.post("/", createExploreList);

router.patch("/:id", updateExploreList);

router.delete("/:id", deleteExploreList);

router.get("/search/:name", getExploreByName);

module.exports = router;
