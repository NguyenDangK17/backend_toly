const express = require("express");
const {
  allMessages,
  sendMessage,
  sendFile,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/file").post(protect, sendFile);

module.exports = router;
