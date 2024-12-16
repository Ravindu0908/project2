const { db } = require("../../../lib/db");
const {
  finishAppointmentByBeautician,
} = require("../../../utils/appointments");
const { getBeauticianByUserId } = require("../../../utils/users");

// finish appointment
const finishExistingBeauticianAppointments = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    // get appointment id from request params
    const { appointmentId } = req.params;
    // get beautician by user id
    const beautician = await getBeauticianByUserId(userId);

    // finish appointment
    const appointment = await finishAppointmentByBeautician(
      appointmentId,
      beautician?.id
    );

    // check if appointment is finished
    if (!appointment) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    //  get appointment with payment details
    const appointmentWithPayment = await db.appointment.findUnique({
      where: {
        id: appointment.id,
      },
      include: {
        payments: {
          select: {
            amount: true,
          },
        },
        service: {
          include: {
            service: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    // payed amount
    const paidAmount = appointmentWithPayment.payments.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    // add remaining amount to payment
    const remainingAmount =
      appointmentWithPayment.service.service.price - paidAmount;

    // if remaining amount is not zero add it to payment
    if (remainingAmount > 0) {
      await db.payment.create({
        data: {
          amount: remainingAmount,
          appointmentId: appointment.id,
          type: "OFFLINE",
          userId: appointment.userId,
        },
      });
    }

    return res.status(200).json({
      message: "Appointment finished successfully.",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = {
  finishExistingBeauticianAppointments,
};
