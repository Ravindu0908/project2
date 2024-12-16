const { db } = require("../lib/db");

// get all appointments
const getAppointments = async () => {
  try {
    const appointments = await db.appointment.findMany({
      select: {
        id: true,
        date: true,
        timeSlot: true,
        status: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        service: {
          select: {
            service: {
              select: {
                name: true,
                price: true,
              },
            },
            beautician: {
              select: {
                branch: true,
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return appointments;
  } catch (error) {
    return null;
  }
};

// get appointment by beautician id
const getAppointmentsByBeauticianId = async (id) => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        service: {
          beauticianId: id,
        },
      },
      select: {
        id: true,
        date: true,
        timeSlot: true,
        status: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        service: {
          select: {
            service: {
              select: {
                name: true,
                price: true,
              },
            },
            beautician: {
              select: {
                branch: true,
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    });
    return appointments;
  } catch (error) {
    return null;
  }
};

// get appointment by beautician id and date
const getAppointmentsByBeauticianIdAndDate = async (id, date) => {
  // reset time to zero
  const dateConverted = new Date(date);
  dateConverted.setHours(0, 0, 0, 0);
  try {
    const appointments = await db.appointment.findMany({
      where: {
        service: {
          beauticianId: id,
        },
        date: dateConverted,
      },
      select: {
        id: true,
        date: true,
        timeSlot: true,
        status: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        service: {
          select: {
            service: {
              select: {
                name: true,
                price: true,
              },
            },
            beautician: {
              select: {
                branch: true,
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return appointments;
  } catch (error) {
    return null;
  }
}

// get appointment by user id
const getAppointmentsByUserId = async (id) => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        date: true,
        timeSlot: true,
        status: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        service: {
          select: {
            service: {
              select: {
                name: true,
                price: true,
              },
            },
            beautician: {
              select: {
                branch: true,
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return appointments;
  } catch (error) {
    return null;
  }
};

// get available time slots by beautician id and date
const getAvailableTimeSlotsByDateAndBeautician = async (beauticianId, date) => {
  // reset time to zero
  const dateConverted = new Date(date);
  dateConverted.setHours(0, 0, 0, 0);
  try {
    // if beautician is on leave
    const leave = await db.leaves.findFirst({
      where: {
        beauticianId: beauticianId,
        startDate: {
          lte: dateConverted,
        },
        endDate: {
          gte: dateConverted,
        },
      },
    });

    // if beautician is on leave
    if (leave) {
      return null;
    }

    const appointments = await db.appointment.findMany({
      where: {
        date: dateConverted,
        status: {
          not: "CANCELLED",
        },
        service: {
          beauticianId: beauticianId,
        },
      },
      select: {
        timeSlot: true,
      },
    });

    const timeSlots = [
      "SLOT_1_8AM_9AM",
      "SLOT_2_9AM_10AM",
      "SLOT_3_10AM_11AM",
      "SLOT_4_11AM_12PM",
      "SLOT_5_1PM_2PM",
      "SLOT_6_2PM_3PM",
      "SLOT_7_3PM_4PM",
      "SLOT_8_4PM_5PM",
      "SLOT_9_5PM_6PM",
    ];
    const availableTimeSlots = timeSlots.filter(
      (timeSlot) =>
        !appointments.some((appointment) => appointment.timeSlot === timeSlot)
    );
    return availableTimeSlots;
  } catch (error) {
    return null;
  }
};

// get available time slots fot next 30 days by beautician id
const getAvailableTimeSlotsForNext30DaysByBeautician = async (beauticianId) => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        service: {
          beauticianId,
        },
        date: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 30)),
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        date: true,
        timeSlot: true,
      },
    });
    // get leaved dates
    const leaves = await db.leaves.findMany({
      where: {
        beauticianId,
        startDate: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 30)),
        },
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    const timeSlots = [
      SLOT_1_8AM_9AM,
      SLOT_2_9AM_10AM,
      SLOT_3_10AM_11AM,
      SLOT_4_11AM_12PM,
      SLOT_5_1PM_2PM,
      SLOT_6_2PM_3PM,
      SLOT_7_3PM_4PM,
      SLOT_8_4PM_5PM,
      SLOT_9_5PM_6PM,
    ];
    const availableTimeSlots = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      let availableSlots = timeSlots.filter(
        (timeSlot) =>
          !appointments.some(
            (appointment) =>
              appointment.date.toDateString() === date.toDateString() &&
              appointment.timeSlot === timeSlot
          )
      );
      // check if date is on leave
      const leave = leaves.find(
        (leave) => date >= leave.startDate && date <= leave.endDate
      );
      if (leave) {
        availableSlots = [];
      }
      availableTimeSlots.push({
        date,
        timeSlots: availableSlots,
      });
    }

    //group by date
    const groupedByDate = availableTimeSlots.reduce((acc, slot) => {
      // if the date doesn't exist in the accumulator, add it
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      // push the current slot to the correct date
      acc[slot.date].push(slot);
      return acc;
    }, {});

    // tf you need the result as an array of groups
    const groupedArray = Object.keys(groupedByDate).map((date) => ({
      date,
      slots: groupedByDate[date],
    }));

    return groupedArray;
  } catch (error) {
    return null;
  }
};

// create appointment
const createAppointment = async (data) => {
  try {
    const appointment = await db.appointment.create({
      data,
      include: {
        user: true,
        service: {
          include: {
            service: true,
            beautician: true,
          },
        },
      },
    });
    return appointment;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// cancel appointment
const cancelAppointment = async (id, userId) => {
  try {
    const appointment = await db.appointment.update({
      where: {
        id,
        userId,
      },
      data: {
        status: "CANCELLED",
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};

// cancel appointment beautician id
const cancelAppointmentByBeautician = async (id, beautician) => {
  try {
    const appointment = await db.appointment.update({
      where: {
        id,
        service: {
          beauticianId: beautician,
        },
      },
      data: {
        status: "CANCELLED",
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};

// finish appointment by beautician id
const finishAppointmentByBeautician = async (id, beautician) => {
  try {
    const appointment = await db.appointment.update({
      where: {
        id,
        service: {
          beauticianId: beautician,
        },
      },
      data: {
        status: "FINISHED",
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};

// cancel appointments by appointments id only (for admin)
const cancelAppointmentById = async (id) => {
  try {
    const appointment = await db.appointment.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};

// finish appointment with review
const finishAppointment = async (id, comment, rating) => {
  try {
    const appointment = await db.appointment.update({
      where: {
        id,
      },
      data: {
        status: "FINISHED",
      },
    });
    // add review
    await db.review.create({
      data: {
        appointmentId: id,
        userId: appointment.userId,
        comment,
        rating,
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAppointments,
  getAppointmentsByBeauticianId,
  getAppointmentsByBeauticianIdAndDate,
  getAppointmentsByUserId,
  getAvailableTimeSlotsByDateAndBeautician,
  getAvailableTimeSlotsForNext30DaysByBeautician,
  createAppointment,
  cancelAppointment,
  cancelAppointmentByBeautician,
  finishAppointmentByBeautician,
  cancelAppointmentById,
  finishAppointment,
};
