const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const nodemailer = require("nodemailer");
const generateToken = require("../config/generateToken");
const Premium = require("../models/premium.model.js");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
//@description     Get user by name
//@route           GET /api/user/name/:name
//@access          Protected
const getUserByName = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by name: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, position } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
    return; // Ensure you return to stop further execution
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.create({
      name,
      email,
      password,
      pic,
      position,
    });

    const newPremium = await Premium.create({
      subscriber: user._id,
    });

    user.premiumPlan = newPremium._id;
    user.token = generateToken(user._id);
    await user.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noplstks@gmail.com",
        pass: "zodyjdbipiwwlnwf",
      },
    })

    await transporter.sendMail({
      from: "Tolynium",
      to: user.email,
      subject: "Email Verification",
      html: `
        <div>
        <h1>Email Verification</h1>
          <a href=${`http://localhost:3000/verify-email?token=${user.token}`}>Click here to verify email</a>
        </div>
      `
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        position: user.position,
        accountType: user.accountType,
        token: user.token,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: "Failed!" });
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(404).json({ message: 'User not found or token expired' });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('Error verifying email:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

//@description     Auth the user
//@route           POST /api/user/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.isVerified) {
    return res.status(401).json({ error: "You must verify email before log in" });
  };

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      friends: user.friends,
      pic: user.pic,
      coverPic: user.coverPic,
      position: user.position,
      accountType: user.accountType,
      premiumPlan: user.premiumPlan,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
    throw new Error("Invalid Email or Password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } else {
    res.status(401).json({ error: "Wrong password" });
    throw new Error("Invalid Password");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  } else {
    user.password = password;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      position: updatedUser.position,
      token: generateToken(updatedUser._id),
    });

    res.status(200).json({ msg: "Password updated successfully" });
  }
});

const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.deleteOne({ _id: req.params.id }); // Use deleteOne method
  res.status(200).json({ message: "User removed successfully" });
});

//----------------UPLOAD AVATAR-----------------------//

const cloudinary = require("cloudinary").v2;
const upload = require("../middleware/fileMiddleware");

cloudinary.config({
  cloud_name: "dcs6oxnew",
  api_key: "124981349666343",
  api_secret: "fur8UklWQm6KdZMURCc1L_INJL0",
});

const uploadAvatar = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findByIdAndUpdate(req.user._id, { pic: result.secure_url });
      res.json({ url: result.secure_url });
    } catch (err) {
      res.status(500).json({ error: "Upload failed" });
    }
  });
});

const uploadBackground = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findByIdAndUpdate(req.user._id, {
        coverPic: result.secure_url,
      });
      res.json({ url: result.secure_url });
    } catch (err) {
      res.status(500).json({ error: "Upload failed" });
    }
  });
});

//@description     Update user position
//@route           PATCH /api/user/update-position
//@access          Protected
const updatePosition = asyncHandler(async (req, res) => {
  const { lat, lng } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.position = { lat, lng };
  await user.save();

  res
    .status(200)
    .json({ message: "User position updated successfully", user: user });
});
const updateUserName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name;
  await user.save();

  res.status(200).json({
    message: "User name updated successfully",
    user: user,
  });
});
module.exports = {
  allUsers,
  registerUser,
  verifyEmail,
  authUser,
  logoutUser,
  updateUserPassword,
  changePassword,
  getUserById,
  getUserByName,
  removeUser,
  uploadAvatar,
  uploadBackground,
  updatePosition,
  updateUserName,
};
