const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  totalDistance: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  daysAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  startDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
