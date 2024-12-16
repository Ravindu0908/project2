const { cancelAppointment } = require("../../../utils/appointments");
const { refundAppointmentFee } = require("../../../utils/payments");

// cancel appointment
const cancelExistingAppointments = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    // get appointment id from request params
    const { appointmentId } = req.params;

    // cancel appointment
    const appointment = await cancelAppointment(appointmentId, userId);

    // check if appointment is cancelled
    if (!appointment) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    // refund
    const refund = await refundAppointmentFee(appointment.id);

    // if not refunded
    if (!refund) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    // reduce beautician current salary by appointment amount
    await db.beautician.update({
      where: {
        id: appointment.beauticianId,
      },
      data: {
        currentSalary: {
          decrement: parseFloat(
            (appointment.service.service.price * 0.1).toFixed(2)
          ),
        },
      },
    });

    return res.status(200).json({
      message: "Appointment cancelled successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = cancelExistingAppointments;
