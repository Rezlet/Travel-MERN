const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your tour name"],
  },
  country: {
    type: String,
    required: [true, "Please enter your tour place"],
  },
  description: {
    type: String,
    required: [true, "Please enter your tour description"],
  },
  destination: {
    type: String,
    required: [true, "Please enter your tour destination"],
  },
  aim: {
    type: String,
    required: [true, "Please enter your tour aim"],
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
    required: [true, "Please enter your main color name"],
  },
  images: [
    {
      type: String,
    },
  ],
  userId: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Tour", tourSchema);
