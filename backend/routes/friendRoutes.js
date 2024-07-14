const express = require("express");
const {
  getFriendListById,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendRequestList,
} = require("../controllers/friendControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/list/:id").get(protect, getFriendListById);

router.route("/request").get(protect, getFriendRequestList);

router.route("/:id").post(protect, sendFriendRequest);

router.route("/accept/:id").patch(protect, acceptFriendRequest);

router.route("/decline/:id").delete(protect, declineFriendRequest);

module.exports = router;
