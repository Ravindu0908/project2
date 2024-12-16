const { db } = require("../../../lib/db");
const { createAppointment } = require("../../../utils/appointments");
const { getUserById } = require("../../../utils/users");
const { addAppointmentSchema } = require("../../../validations/user");
const md5 = require("md5");

// add appointments
const addNewAppointments = async (req, res) => {
  try {
    // get user id from request
    const userId = req.user.id;
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = addAppointmentSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { date, timeSlot, service } = validatedData.data;

    // check user is exist
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    // reset time to zero
    const dateConverted = new Date(date);
    dateConverted.setHours(0, 0, 0, 0);

    // create appointment
    const appointment = await createAppointment({
      date: dateConverted,
      timeSlot,
      userId,
      serviceId: service,
    });

    // check if appointment is created
    if (!appointment) {
      console.log("appointment not created");
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    // delete pending appointment after 15 minutes
    setTimeout(() => {
      deletePendingAppointment(appointment.id);
    }, 15 * 60 * 1000);

    // generate payment hashes
    const hash = md5(
      process.env.PAYHERE_MERCHANT_ID +
        appointment.id +
        ((appointment.service?.service?.price || 0) * 0.2).toFixed(2) +
        "LKR" +
        md5(process.env.PAYHERE_SECRET).toUpperCase()
    ).toUpperCase();

    // return success response
    return res.status(200).json({
      success: true,
      payment: {
        merchant_id: process.env.PAYHERE_MERCHANT_ID,
        return_url: process.env.PAYHERE_RETURN_URL,
        cancel_url: process.env.PAYHERE_CANCEL_URL,
        notify_url: process.env.PAYHERE_NOTIFY_URL,
        order_id: appointment.id,
        items: `Appointment- ${dateConverted.toDateString()}`,
        currency: "LKR",
        amount: (appointment.service?.service?.price || 0) * 0.2,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        address: "",
        city: "",
        country: "",
        hash: hash,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

// confirm appointment
const confirmAppointment = async (req, res) => {
  try {
    // get appointment id from request
    const { appointmentId } = req.params;

    // get appointment data
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        service: {
          include: {
            service: true,
          },
        },
      },
    });

    // if appointment not found
    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    // update appointment status
    const updatedAppointment = await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "RESERVED",
      },
    });

    // if appointment not updated
    if (!updatedAppointment) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    // calculate amount
    const amount = (appointment.service?.service?.price || 0) * 0.2;

    // add payment record
    const payment = await db.payment.create({
      data: {
        userId: req.user.id,
        appointmentId: appointment.id,
        amount,
      },
    });

    // if payment not exist
    if (!payment) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    // update beauticians current salary by increase 10% of service price
    await db.beautician.update({
      where: {
        id: appointment.service.beauticianId,
      },
      data: {
        currentSalary: {
          increment: parseFloat(
            (appointment.service.service.price * 0.1).toFixed(2)
          ),
        },
      },
    });

    // return success response
    return res.status(200).json({
      success: true,
      message: "Appointment confirmed successfully.",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

// delete pending appointment
const deletePendingAppointment = async (id) => {
  // get appointment data
  const appointment = await db.appointment.findUnique({
    where: {
      id,
    },
  });

  // if appointment not found
  if (!appointment) {
    return false;
  }

  // delete appointment
  if (appointment.status === "PENDING") {
    const deletedAppointment = await db.appointment.delete({
      where: {
        id,
      },
    });

    // if appointment not deleted
    if (!deletedAppointment) {
      return false;
    }
  }

  return true;
};

module.exports = { addNewAppointments, confirmAppointment };
