const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Friend = require("../models/friend.model.js");
const User = require("../models/user.model.js");

const getFriendListById = asyncHandler(async (req, res) => {
  // const { _id: currentUser } = req.user;

  try {
    const friends = await User.findById(req.params.id).populate("friends", "name pic email position");

    if (!friends) {
      return res.status(404).json({ message: "No accepted friends found" });
    }

    res.status(200).json(friends);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

const getFriendRequestList = asyncHandler(async (req, res) => {
  try {
    const { _id: currentUser } = req.user;

    // Find friend requests where currentUser is either the requester or the recipient
    const requestList = await Friend.find({
      $or: [
        { requester: currentUser },
        { recipient: currentUser }
      ]
    }).populate("requester recipient", "name email pic");

    if (!requestList) {
      return res.status(404).json({ message: "No Friend Request" });
    }

    res.status(200).json(requestList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { _id: requesterId } = req.user;
  const { id: recipientId } = req.params;

  try {
    // Check if a friend request already exists
    const existingFriendRequest = await Friend.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: { $in: [1, 2] },
    });

    if (existingFriendRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create a new friend request
    const friendRequest = {
      requester: requesterId,
      recipient: recipientId,
      status: 1,
    };

    let friend = await Friend.create(friendRequest);

    // Populate requester and recipient fields
    friend = await friend.populate("requester", "name pic");
    friend = await friend.populate("recipient", "name pic");

    res.status(201).json(friend);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: requesterId } = req.params;
    const { _id: userId } = req.user;

    // Update the friend request status
    const friend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: userId, status: 1 }, // Assuming status 1 means pending
      { status: 2 }, // Assuming status 2 means accepted
      { new: true, session }
    );

    if (!friend) {
      throw new Error("Friend request not found or already accepted.");
    }

    // Add each user to the other's friends list
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: requesterId } },
      { new: true, session }
    );

    const requesterUpdate = await User.findByIdAndUpdate(
      requesterId,
      { $addToSet: { friends: userId } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ user: userUpdate, requester: requesterUpdate });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

const declineFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { _id: currentUser } = req.user;
    const { id: userId } = req.params;

    const requestList = await Friend.findOneAndDelete({
      $or: [
        { requester: currentUser, recipient: userId },
        { recipient: currentUser, requester: userId }
      ]
    });

    if (!requestList) {
      return res.status(404).json({ message: "No friend request found" });
    }

    res.status(200).json(requestList);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getFriendListById,
  getFriendRequestList,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};
