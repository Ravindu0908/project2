const { getAppointmentsByUserId } = require("../../../utils/appointments");

// get appointment based on logged in user
const getExistingAppointments = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    // get appointments
    const appointments = await getAppointmentsByUserId(userId);
    // check if appointments exist
    if (!appointments) {
      return res.status(200).json({
        appointments: [],
      });
    }
    return res.status(200).json({
      appointments,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = getExistingAppointments;
