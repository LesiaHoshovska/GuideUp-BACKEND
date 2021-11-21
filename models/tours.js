const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
    minlength: 2,
  },
  dates: new mongoose.Schema({
    startDate: {
      type: Array,
      required: true,
    },
    endDate: {
      type: Array,
      required: true,
    },
  }),

  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  daysDescription: new mongoose.Schema({
    dayTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    daySubtitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 20,
    },
    dayDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 50,
    },
  }),
  activity: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  dificulties: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  priceIncluded: {
    type: Array,
    required: true,
  },
  priceExcluded: {
    type: Array,
    required: true,
  },
  gearList: new mongoose.Schema({
    mainGear: {
      type: Array,
      required: true,
    },
    clothes: {
      type: Array,
      required: true,
    },
    boots: {
      type: Array,
      required: true,
    },
    anotherNesessaryGear: {
      type: Array,
      required: true,
    },
  }),
});

module.exports = mongoose.model("Tour", tourSchema);
