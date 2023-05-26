const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Tour = require("../models/tour");
const User = require("../models/user");
const Payment = require("../models/payment");
const sendMail = require("../utils/sendMail");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-payment-deposit",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let paymentData = req.body;
      const isExist = await Payment.findOne({
        transactionId: paymentData.transactionId,
      });
      if (isExist) {
        return next(new ErrorHandler("Transaction already exists", 400));
      }
      paymentData.quantity = Number(paymentData.quantity);
      paymentData.status = "1"; // deposit

      const tourId = paymentData.tourId;
      let userId = null; // nullable
      if (paymentData.userId) {
        userId = paymentData.userId;
      }
      let user;
      const tour = await Tour.findById(tourId);
      if (userId != "null") {
        user = await User.findById(userId);
      }
      console.log(user);

      paymentData.tour = tour;
      paymentData.user = user;
      paymentData.amount = tour.price * paymentData.quantity;
      const payment = await Payment.create(paymentData);

      await sendMail({
        email: user.email,
        subject: "Departure Schedule Information",
        message: `
        <h1>Successful Booking Notification</h1>
        <p>Dear ${user.email},</p>
        <p>Your booking has been successfully confirmed, and We will notify you of the departure date via phone number.</p>
        <p>Thank you for choosing our service.</p>
        <p>Best regards,</p>
        <p>Love Travel </p>
      `,
      });

      res.status(201).json({
        success: true,
        payment,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-payments",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const limit = 100; // Số tour trên mỗi trang (mặc định là 10)

      const totalTours = await Payment.countDocuments(); // Tổng số lượng tour trong cơ sở dữ liệu

      const payments = await Payment.find({})
        .sort({ createAt: -1 })
        .limit(limit); // Lấy danh sách tour phân trang

      res.status(200).json({
        success: true,
        payments,
        totalTours,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/paid/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const paymentId = req.params.id;
      console.log(paymentId);

      const currentPayment = await Payment.findById(paymentId);

      const payment = await Payment.updateOne(
        { _id: paymentId },
        {
          $set: {
            received: currentPayment.amount,
            status: "2",
          },
        }
      );

      console.log(payment);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/cancel/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const paymentId = req.params.id;
      console.log(paymentId);

      const currentPayment = await Payment.findById(paymentId);

      const payment = await Payment.updateOne(
        { _id: paymentId },
        {
          $set: {
            status: "0",
          },
        }
      );

      console.log(payment);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
