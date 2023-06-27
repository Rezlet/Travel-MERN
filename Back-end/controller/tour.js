const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Tour = require("../models/tour");
const User = require("../models/user");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sortObject = require("sort-object");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create-tour",
  upload.array("images"),
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const files = req.files;
      const imageUrls = files.map((file) => {
        return `${file.filename}`;
      });
      const tourData = req.body;
      console.log(imageUrls);

      tourData.images = imageUrls;

      tourData.user = req.user;

      const tour = await Tour.create(tourData);

      res.status(201).json({
        success: true,
        tour,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-tour",
  upload.array("images"),
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const files = req.files;
      console.log(req.files);
      const imageUrls = files.map((file) => {
        return `${file.filename}`;
      });


      const tourData = req.body;

      const currentTour = await Tour.findById(tourData.id);

      tourData.images = [...imageUrls, ...currentTour.images];

      tourData.user = req.user;

      const tour = await Tour.updateOne(  { _id: tourData.id }, tourData);

      res.status(201).json({
        success: true,
        tour,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-tour/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const tourId = req.params.id;

      const currentTour = await Tour.findOne({id: tourId})

      const deletedTour = await Tour.deleteOne(currentTour);

      res.status(201).json({
        success: true,
        deletedTour
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all tour of a user
router.get(
  "/get-all-tour-admin/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const tours = await Tour.find({ userId: req.params.id });

      res.status(201).json({
        success: true,
        tours,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-tour",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const limit = 48; // Số tour trên mỗi trang (mặc định là 10)

      const tours = await Tour.find({}).sort({ createAt: -1 }).limit(limit); // Lấy danh sách tour phân trang

      res.status(200).json({
        success: true,
        tours,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-tour/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        success: true,
        tour,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}

function dateFormatAll(date) {
  let dateFormated =
    date.getFullYear() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());

  return dateFormated;
}

function dateFormatOrderId(date) {
  let dateFormated =
    pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());

  return dateFormated;
}
router.post("/create_payment_url", function (req, res, next) {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = process.env.VPN_TMNCODE;
  var secretKey = process.env.VPN_HASHSECRET;
  var vnpUrl = process.env.VNP_URL;
  var returnUrl = process.env.RETURN_URL;

  var date = new Date();
  var createDate = dateFormatAll(date);
  var orderId = dateFormatOrderId(date);
  var amount = Number(req.body.paymentInfo.amount);
  var tourId = req.body.paymentInfo.tourId;
  var userId = req.body.paymentInfo.userId;
  var bankCode = "";
  var orderInfo = req.body.paymentInfo.orderDescription;
  var quantity = req.body.paymentInfo.quantity;

  // var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }

  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] =
    returnUrl + `?tourId=${tourId}&userId=${userId}&quantity=${quantity}`;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: true });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

  res.status(201).json({
    success: true,
    vnpUrl,
  });
  // return res.redirect(vnpUrl);
});

router.get("/vnpay_ipn", function (req, res, next) {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];
  console.log(req.query);
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var secretKey = process.env.VPN_HASHSECRET;
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
});

router.get("/success_payment", function (req, res, next) {
  var vnp_Params = req.query;
  console.log(req.query);
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var config = require("config");
  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
});

module.exports = router;
