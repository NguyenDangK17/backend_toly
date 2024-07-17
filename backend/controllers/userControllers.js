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
        user: "tolyinc.exe2@gmail.com",
        pass: "twghftqjnblirqf",
      },
    })

    await transporter.sendMail({
      from: "Tolynium",
      to: user.email,
      subject: "Email Verification",
      html: `
        <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }

      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }

    /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%;
      /* 1 */
      -webkit-text-size-adjust: 100%;
      /* 2 */
    }

    /**
   * Remove extra space added to tables and cells in Outlook.
   */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }

    /**
   * Better fluid images in Internet Explorer.
   */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /**
   * Remove blue links for iOS devices.
   */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }

    /**
   * Fix centering issues in Android 4.4.
   */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }

    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /**
   * Collapse table borders to avoid space between cells.
   */
    table {
      border-collapse: collapse !important;
    }

    a {
      color: #1a82e2;
    }

    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
  </style>

</head>

<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://toly.vercel.app">Toly</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href=${`https://toly.vercel.app/verify-email?token=${user.token}`} target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify your email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, please contact us through this link:</p>
              <p style="margin: 0;"><a href="https://toly.vercel.app/contact" target="_blank">Contact</a></p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> Toly</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->

          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="https://toly.vercel.app" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Toly 1234 S. Broadway St. City, State 12345</p>
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
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
    console.log("Logging out...");
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
