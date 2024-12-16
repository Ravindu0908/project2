const express = require("express");
const router = express.Router();
const multer = require("multer");
const addNewProduct = require("./admin/products/add-products");
const updateExistingProduct = require("./admin/products/update-products");
const deleteExistingProduct = require("./admin/products/delete-products");
const getExistingAppointments = require("./admin/appointments/get-appointments");
const addUser = require("./admin/users/add-user");
const getUsers = require("./admin/users/get-user");
const {
  getPendingBeauticianAccounts,
  approveBeauticianAccount,
  rejectBeauticianAccount,
} = require("./admin/beauticians/beauticians-approvals");
const addNewService = require("./admin/services/add-services");
const getExistingServices = require("./admin/services/get-services");
const updateExistingService = require("./admin/services/update-services");
const deleteExistingService = require("./admin/services/delete-service");
const { addNewPackage } = require("./admin/packages/add-package");
const { deleteExistingPackage } = require("./admin/packages/delete-package");
const { updateExistingPackage } = require("./admin/packages/update-package");
const {
  cancelAppointments,
} = require("./admin/appointments/cancel-appointments");
const {
  getExistingLeaves,
  approveLeave,
  rejectLeave,
} = require("./admin/leaves/manage-leaves");
const { getOrders } = require("./admin/order/get-order");
const { shipOrder } = require("./admin/order/ship-order");
const { disableUser } = require("./admin/users/disable-user");
const getStatistics = require("./admin/get-statistics");
const {
  getBeauticians,
  getBeauticianSalary,
} = require("./admin/salary/get-salary");
const { paySalaries } = require("./admin/salary/pay-salary");
const {
  markAttendance,
  getAttendanceByBeautician,
} = require("./admin/attendance/mark-attendance ");

// storage for products image
const productsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, `/${Date.now()}_${file.originalname}`);
  },
});
const uploadProduct = multer({ storage: productsStorage });

router.post(
  "/products",
  uploadProduct.array("product", 4),
  async (req, res) => {
    return await addNewProduct(req, res);
  }
);

router.put(
  "/products/:productCode",
  uploadProduct.array("product", 4),
  async (req, res) => {
    return await updateExistingProduct(req, res);
  }
);

router.delete("/products/:productCode", async (req, res) => {
  return await deleteExistingProduct(req, res);
});

router.post("/services", async (req, res) => {
  return await addNewService(req, res);
});

router.get("/services", async (req, res) => {
  return await getExistingServices(req, res);
});

router.put("/services/:serviceId", async (req, res) => {
  return await updateExistingService(req, res);
});

router.delete("/services/:serviceId", async (req, res) => {
  return await deleteExistingService(req, res);
});

router.get("/appointments", async (req, res) => {
  return await getExistingAppointments(req, res);
});

router.delete("/appointments/:appointmentId", async (req, res) => {
  return await cancelAppointments(req, res);
});

router.post("/users", async (req, res) => {
  return await addUser(req, res);
});

router.get("/users", async (req, res) => {
  return await getUsers(req, res);
});

router.delete("/users/:userId", async (req, res) => {
  return await disableUser(req, res);
});

router.get("/beautician-approvals", async (req, res) => {
  return await getPendingBeauticianAccounts(req, res);
});

router.post("/beautician-approvals/:beauticianId", async (req, res) => {
  return await approveBeauticianAccount(req, res);
});

router.delete("/beautician-approvals/:beauticianId", async (req, res) => {
  return await rejectBeauticianAccount(req, res);
});

router.post("/packages", async (req, res) => {
  return await addNewPackage(req, res);
});

router.put("/packages/:packageId", async (req, res) => {
  return await updateExistingPackage(req, res);
});

router.delete("/packages/:packageId", async (req, res) => {
  return await deleteExistingPackage(req, res);
});

router.get("/leaves", async (req, res) => {
  return await getExistingLeaves(req, res);
});

router.post("/leaves/approve/:leaveId", async (req, res) => {
  return await approveLeave(req, res);
});

router.post("/leaves/reject/:leaveId", async (req, res) => {
  return await rejectLeave(req, res);
});

router.get("/orders", async (req, res) => {
  return await getOrders(req, res);
});

router.post("/orders/shipped/:orderId", async (req, res) => {
  return await shipOrder(req, res);
});

router.get("/statistics", async (req, res) => {
  return await getStatistics(req, res);
});

router.get("/beauticians", async (req, res) => {
  return await getBeauticians(req, res);
});

router.get("/beautician-salary/:beauticianId", async (req, res) => {
  return await getBeauticianSalary(req, res);
});

router.post("/salary/pay/:beauticianId", async (req, res) => {
  return await paySalaries(req, res);
});

router.post("/attendance/:email", async (req, res) => {
  return await markAttendance(req, res);
});

router.get("/attendance/:email", async (req, res) => {
  return await getAttendanceByBeautician(req, res);
});

module.exports = router;
