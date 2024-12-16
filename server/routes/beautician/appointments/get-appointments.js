// get appointment based on beautician id

const {
  getAppointmentsByBeauticianId,
  getAppointmentsByBeauticianIdAndDate,
} = require("../../../utils/appointments");
const { getBeauticianByUserId } = require("../../../utils/users");

const getExistingAppointments = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    //get beautician id from user id
    const beautician = await getBeauticianByUserId(userId);
    // get appointments
    const appointments = await getAppointmentsByBeauticianId(beautician.id);
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

// get existing appointments by date
const getExistingAppointmentsByDate = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    //get beautician id from user id
    const beautician = await getBeauticianByUserId(userId);
    // get date from request
    const date = req.params.date;
    // get appointments
    const appointments = await getAppointmentsByBeauticianIdAndDate(
      beautician.id,
      date
    );
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

module.exports = {getExistingAppointments, getExistingAppointmentsByDate};
