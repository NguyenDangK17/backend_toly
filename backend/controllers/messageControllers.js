const asyncHandler = require("express-async-handler");
const upload = require("../middleware/fileMiddleware");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcs6oxnew",
  api_key: "124981349666343",
  api_secret: "fur8UklWQm6KdZMURCc1L_INJL0",
});

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendFile = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    // const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const message = await Message.create({
        sender: req.user._id,
        content: result.secure_url,
        chat: req.body.chatId,
        file: true,
      });

      const populatedMessage = await message.populate('sender chat', 'name pic');
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: populatedMessage });

      res.status(200).json(populatedMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
})

module.exports = { allMessages, sendMessage, sendFile };
