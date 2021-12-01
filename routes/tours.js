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
    .withMessage("Total distance must be specified")
    .toInt(),
  body("price")
    .isInt({ min: 1 })
    .withMessage("Price must be specified")
    .toInt()
    .escape(),
  body("daysAmount")
    .isInt({ min: 1 })
    .withMessage("Days amount must be specified")
    .toInt()
    .escape(),
  body("country")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Country must be specified")
    .escape(),
  body("startDate")
    .isDate(["/", "-"])
    .withMessage("Date must be specified")
    .escape(),
  body("finishDate")
    .isDate(["/", "-"])
    .withMessage("Date must be specified")
    .escape(),
  body("description")
    .isLength({ min: 50 })
    .trim()
    .withMessage("Description must be specified")
    .escape(),
  body("activity")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Activity must be specified")
    .escape(),
  body("difficulties")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulties must be specified")
    .toInt(),
  body("priceIncluded")
    .isLength({ min: 10 })
    .trim()
    .withMessage("priceIncluded must be specified")
    .escape(),
  body("priceExcluded")
    .isLength({ min: 10 })
    .trim()
    .withMessage("priceExcluded must be specified")
    .escape(),
  body("tourImgSrc")
    .isLength({ min: 10 })
    .trim()
    .withMessage("tourImgSrc must be specified")
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
      finishDate: req.body.finishDate,
      description: req.body.description,
      activity: req.body.activity,
      difficulties: parseInt(req.body.difficulties),
      priceIncluded: req.body.priceIncluded,
      priceExcluded: req.body.priceExcluded,
      tourImgSrc: req.body.tourImgSrc,
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
    .withMessage("Total distance must be specified")
    .toInt(),
  body("price")
    .isInt({ min: 1 })
    .withMessage("Price must be specified")
    .toInt()
    .escape(),
  body("daysAmount")
    .isInt({ min: 1 })
    .withMessage("Days amount must be specified")
    .toInt()
    .escape(),
  body("country")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Country must be specified")
    .escape(),
  body("startDate")
    .isDate(["/", "-"])
    .withMessage("Date must be specified")
    .escape(),
  body("finishDate")
    .isDate(["/", "-"])
    .withMessage("Date must be specified")
    .escape(),
  body("description")
    .isLength({ min: 50 })
    .trim()
    .withMessage("Description must be specified")
    .escape(),
  body("activity")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Activity must be specified")
    .escape(),
  body("difficulties")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulties must be specified")
    .toInt(),
  body("priceIncluded")
    .isLength({ min: 10 })
    .trim()
    .withMessage("priceIncluded must be specified")
    .escape(),
  body("priceExcluded")
    .isLength({ min: 10 })
    .trim()
    .withMessage("priceExcluded must be specified")
    .escape(),
  body("tourImgSrc")
    .isLength({ min: 10 })
    .trim()
    .withMessage("tourImgSrc must be specified")
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
        finishDate: req.body.finishDate,
        description: req.body.description,
        activity: req.body.activity,
        difficulties: parseInt(req.body.difficulties),
        priceIncluded: req.body.priceIncluded,
        priceExcluded: req.body.priceExcluded,
        tourImgSrc: req.body.tourImgSrc,
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
