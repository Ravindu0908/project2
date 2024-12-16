const express = require("express");
const {
  getExistingAppointments,
  getExistingAppointmentsByDate,
} = require("./beautician/appointments/get-appointments");
const router = express.Router();
const multer = require("multer");
const { submitBeauticianResumes } = require("./beautician/submit-resumes");
const {
  cancelExistingBeauticianAppointments,
} = require("./beautician/appointments/cancel-appointments");
const { applyLeaves } = require("./beautician/leaves/apply-leaves");
const { getLeaves } = require("./beautician/leaves/get-leaves");
const {
  finishExistingBeauticianAppointments,
} = require("./beautician/appointments/finish-appointments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/beauticians");
  },
  filename: function (req, file, cb) {
    return cb(null, `/${req.user.email}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/appointments", async (req, res) => {
  return await getExistingAppointments(req, res);
});

router.delete("/appointments/:appointmentId", async (req, res) => {
  return await cancelExistingBeauticianAppointments(req, res);
});

router.post("/appointments/:appointmentId", async (req, res) => {
  return await finishExistingBeauticianAppointments(req, res);
});

router.get("/appointments/:date", async (req, res) => {
  return await getExistingAppointmentsByDate(req, res);
});

router.post("/resume", upload.single("resume"), async (req, res) => {
  return await submitBeauticianResumes(req, res);
});

router.get("/leaves", async (req, res) => {
  return await getLeaves(req, res);
});

router.post("/leave", async (req, res) => {
  return await applyLeaves(req, res);
});

module.exports = router;
