const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: [true, "Please enter Transaction id"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter amount"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  status: {
    type: String, // "0" is canceled ||"1" ís deposit || "2" is paid
    required: [true, "Please enter status"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter quantity"],
  },
  received: {
    type: Number,
    required: [true, "Please enter received"],
  },
  images: [
    {
      type: String,
    },
  ],
  userId: {
    type: String,
    // required: true,
    default: null,
  },
  user: {
    type: Object,
    // required: true,
    default: null,
  },
  tourId: {
    type: String,
    required: true,
  },
  tour: {
    type: Object,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
