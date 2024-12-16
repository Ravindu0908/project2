const express = require("express");
const router = express.Router();
const getAvailableTimeSlots = require("./public/get-available-time-slots");
const { getAllProducts, getSpecificProduct } = require("./public/get-products");
const {
  getBeauticianByBranch,
  getBeauticianByBranchAndService,
} = require("./public/get-beautician");
const {
  getAvailableTimeSlotsForNext30DaysByBeautician,
} = require("../utils/appointments");
const { getAllServices } = require("./public/get-services");
const {
  getAllPackages,
  getExistingPackageById,
} = require("./public/get-packages");
const { getAllReviews } = require("./public/get-reviews");

// get all products
router.get("/products", async (req, res) => {
  return await getAllProducts(req, res);
});

// get product by product code
router.get("/products/:productCode", async (req, res) => {
  return await getSpecificProduct(req, res);
});

// get beautician by their branch
router.get("/branches/:branch?/beauticians", async (req, res) => {
  return await getBeauticianByBranch(req, res);
});

// get beautician by branch and service
router.get(
  "/branches/filter/:branch?/services/:service?/beauticians",
  async (req, res) => {
    return await getBeauticianByBranchAndService(req, res);
  }
);

// get all available services
router.get("/services/:beauticianId?", async (req, res) => {
  return await getAllServices(req, res);
});

// get available dates and time slots by beautician id
router.get("/time-slots/:beauticianId", async (req, res) => {
  return await getAvailableTimeSlotsForNext30DaysByBeautician(req, res);
});

// get available time slots by beautician id and date
router.get("/time-slots/:beauticianId/:date", async (req, res) => {
  return await getAvailableTimeSlots(req, res);
});

// get all package details
router.get("/packages", async (req, res) => {
  return await getAllPackages(req, res);
});

// get package by package id
router.get("/packages/:packageId", async (req, res) => {
  return await getExistingPackageById(req, res);
});

// get appointment reviews
router.get("/reviews", async (req, res) => {
  return await getAllReviews(req, res);
});

module.exports = router;
