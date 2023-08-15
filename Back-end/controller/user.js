const express = require("express");
const path = require("path");
const User = require("../models/user");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const base64url = require("base64url");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
// create active token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
// create token and send to email
router.post("/create-user", upload.single("file"), async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  console.log(req.body);
  const userEmail = await User.findOne({ email });
  try {
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.status(400).json({ message: "User already exists" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      phoneNumber: numberPhone,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const encodedToken = base64url.encode(activationToken);
    console.log(encodedToken);
    const activationUrl = `http://127.0.0.1:5173/activation/${encodedToken}`;
    // send mail

    try {
      await sendMail({
        email: user.email,
        subject: "Activate you account",
        message: `
        <h1>Account Activation</h1>
        <p>Hello ${user.name},</p>
        <p>Please click on the link below to activate your account:</p>
        <p><a href="${activationUrl}">Click here to create your account !! </a></p>
        <p>Thank you for joining our service.</p>
        <p>Best regards,</p>
        <p>Love Travel </p>
      `,
      });
    } catch (err) {
      console.log("error send mail");
      return next(new ErrorHandler(err.message, 400));
    }

    // const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      statusText: "Please check your email",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message), 400);
  }
});

// router.put(
//   "/update-user",
//   isAuthenticated,
//   catchAsyncError(async (req, res, next) => {
//     try {
//       const { name, numberPhone, currentPassword, newPassword } = req.body;
//       // let user = await User.findById(req.user.id).select("+password");
//       let user = await User.findOne({ email: req.user.email }).select("+password");
//       console.log(user)
//       if (!user) {
//         return next(new ErrorHandler("User doesn't exists", 400));
//       }
//       console.log("check is valid start")

//       const isPasswordValid = await user.comparePassword(currentPassword);
//       console.log("check is valid end with result: "+ isPasswordValid)

//       if (!isPasswordValid) {
//         return next(
//           new ErrorHandler("Please provide the correct information", 400)
//         );
//       }
//       console.log(newPassword)
//       user.name = name;
//       user.password = newPassword;
//       user.phoneNumber = numberPhone;

//       const updatedUser = await User.updateOne({ _id: user.id }, user);

//       res.status(200).json({
//         success: true,
//         updatedUser,
//       });
//     } catch (err) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
// active user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    console.log("called");
    try {
      const { activation_token } = req.body;

      const token = base64url.decode(activation_token);
      const newUser = jwt.verify(token, process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, phoneNumber, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
        phoneNumber,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// login user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler(err.message, 500));
      }

      let user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    // router.get("/getuser", catchAsyncError(async (req,res,next) => {
    try {
      const token = req.headers;
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
