const express = require("express");
const {
  addNewAppointments,
  confirmAppointment,
} = require("./client/appointments/add-appointments");
const getExistingAppointments = require("./client/appointments/get-appointments");
const cancelExistingAppointments = require("./client/appointments/cancel-appointments");
const { addOrRemoveCart, getCart } = require("./client/buy-products/cart");
const {
  checkOutProducts,
  completeCheckOut,
  getAddress,
  finishOrder,
  addReviewForItem,
  getClientOrders,
} = require("./client/buy-products/checkout");
const {
  finishExistingAppointments,
} = require("./client/appointments/finish-appointments");
const router = express.Router();

router.post("/appointments", async (req, res) => {
  return await addNewAppointments(req, res);
});

router.post("/appointments/:appointmentId", async (req, res) => {
  return await confirmAppointment(req, res);
});

router.get("/appointments", async (req, res) => {
  return await getExistingAppointments(req, res);
});

router.delete("/appointments/:appointmentId", async (req, res) => {
  return await cancelExistingAppointments(req, res);
});

router.post("/appointments/finish/:appointmentId", async (req, res) => {
  return await confirmAppointment(req, res);
});

router.post("/appointments/review/:appointmentId", async (req, res) => {
  return await finishExistingAppointments(req, res);
});

router.post("/cart/:productId", async (req, res) => {
  return await addOrRemoveCart(req, res);
});

router.get("/cart", async (req, res) => {
  return await getCart(req, res);
});

router.post("/products/check-out", async (req, res) => {
  return await checkOutProducts(req, res);
});

router.get("/products/address", async (req, res) => {
  return await getAddress(req, res);
});

router.post("/products/check-out/:orderId", async (req, res) => {
  return await completeCheckOut(req, res);
});

router.post("/products/check-out/finish/:orderId", async (req, res) => {
  return await finishOrder(req, res);
});

router.get("/orders", async (req, res) => {
  return await getClientOrders(req, res);
});

router.post("/products/review/:productId/:orderId", async (req, res) => {
  return await addReviewForItem(req, res);
});

module.exports = router;
