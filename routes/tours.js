var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

const Tour = require("../models/tours");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/GuideUp_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get("/", function (req, res, next) {
  Tour.find({}, function (err, docs) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: docs });
  });
});

router.get("/:tourId", function (req, res, next) {
  Tour.findById(req.params["tourId"], function (err, doc) {
    if (err)
      return res.status(500).json({ success: false, err: { msg: "Failed!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

router.post(
  "/add",
  body("title")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("totalDistance")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt(),
  body("price")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt()
    .escape(),
  body("daysAmount")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt()
    .escape(),
  body("country")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("startDate").isDate().withMessage("Must be specified").toInt().escape(),
  body("description")
    .isLength({ min: 50 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("imgSrc")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ success: false, err: errors.array() });
    }
    const tour = new Tour({
      title: req.body.title,
      totalDistance: parseFloat(req.body.totalDistance),
      price: parseFloat(req.body.price),
      daysAmount: parseFloat(req.body.daysAmount),
      country: req.body.country,
      startDate: req.body.startDate,
      description: req.body.description,
      imgSrc: req.body.imgSrc,
    });
    tour.save(function (err) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving failed!" } });
      res.status(200).json({ success: true, tourId: tourDoc._id });
    });
  }
);

router.put(
  "/update",
  body("title")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("totalDistance")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt(),
  body("price")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt()
    .escape(),
  body("daysAmount")
    .isInt({ min: 1 })
    .withMessage("Must be specified")
    .toInt()
    .escape(),
  body("country")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("startDate")
    .isDate({ delimiters: ["/", "-", "."] })
    .withMessage("Must be specified")
    .toInt()
    .escape(),
  body("description")
    .isLength({ min: 50 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  body("imgSrc")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Title must be specified")
    .escape(),
  function (req, res, next) {
    Tour.findByIdAndUpdate(
      req.body.tourId,
      {
        title: req.body.title,
        totalDistance: parseFloat(req.body.totalDistance),
        price: parseFloat(req.body.price),
        daysAmount: parseFloat(req.body.daysAmount),
        country: req.body.country,
        startDate: req.body.startDate,
        description: req.body.description,
        imgSrc: req.body.imgSrc,
      },
      function (err) {
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Saving err!" } });
        res.status(200).json({ success: true });
      }
    );
  }
);

router.delete("/", function (req, res, next) {
  Tour.findByIdAndDelete(req.body.tourId, function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Delete failed!" } });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
