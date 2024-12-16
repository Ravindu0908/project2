const {
  getAvailableTimeSlotsByDateAndBeautician,
} = require("../../utils/appointments");

// get available time slots by beautician id and date
const getAvailableTimeSlots = async (req, res) => {
  try {
    // get beautician id from request and date
    const { beauticianId, date } = req.params;
    const timeSlots = await getAvailableTimeSlotsByDateAndBeautician(
      beauticianId,
      date
    );
    // check if time slots exist
    if (!timeSlots) {
      return res.status(200).json({
        timeSlots: [],
      });
    }
    return res.status(200).json({
      timeSlots,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = getAvailableTimeSlots;
