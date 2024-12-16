const { getAppointments } = require("../../../utils/appointments");

// get all appointments
const getExistingAppointments = async (req, res) => {
  try {
    // get appointments
    const appointments = await getAppointments();
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
