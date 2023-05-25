const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static("./uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "Back-end/config/.env",
  });
}

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

const user = require("./controller/user");
const tour = require("./controller/tour");
const payment = require("./controller/payment");

app.use("/api/v2/user", user);
app.use("/api/v2/tour", tour);
app.use("/api/v2/payment", payment);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
