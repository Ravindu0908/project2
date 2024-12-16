const { finishAppointment } = require("../../../utils/appointments");
const { finishAppointmentSchema } = require("../../../validations/user");

const finishExistingAppointments = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    // get review data from request
    const data = req.body;
    // validate review data
    const validateData = finishAppointmentSchema.safeParse(data);

    // if validation fails
    if (!validateData.success) {
      return res.status(400).json({
        errors: validateData.error.errors,
      });
    }

    // destruct review data
    const { comment, rating } = validateData.data;

    // finish appointment
    const appointment = await finishAppointment(appointmentId, comment, rating);

    // if appointment not found
    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    // return success response
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

module.exports = { finishExistingAppointments };
