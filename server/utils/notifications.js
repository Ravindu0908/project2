const cron = require("node-cron");
const { db } = require("../lib/db");
const { notificationsTemplate } = require("../templates/notifications");
const { sendEmail } = require("./emails");

const timeSlotMap = {
  SLOT_1_8AM_9AM: 8,
  SLOT_2_9AM_10AM: 9,
  SLOT_3_10AM_11AM: 10,
  SLOT_4_11AM_12PM: 11,
  SLOT_5_1PM_2PM: 13,
  SLOT_6_2PM_3PM: 14,
  SLOT_7_3PM_4PM: 15,
  SLOT_8_4PM_5PM: 16,
  SLOT_9_5PM_6PM: 17,
};

const notifyAppointmentsBeforeThreeHour = async () => {
  // get appointments for today
  const date = new Date();
  // clear time
  date.setHours(0, 0, 0, 0);
  const appointments = await db.appointment.findMany({
    where: {
      date,
    },
    select: {
      date: true,
      timeSlot: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      service: {
        select: {
          service: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // get current time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  appointments.forEach(async (appointment) => {
    const appointmentTime = timeSlotMap[appointment.timeSlot];
    if (appointmentTime - currentHour === 3) {
      // appointment details
      const name = `${appointment.user.firstName} ${appointment.user.lastName}`;
      const service = appointment.service.service.name;
      const time = `${timeSlotMap[appointment.timeSlot]}:00 - ${
        timeSlotMap[appointment.timeSlot] + 1
      }:00`;
      // email template update with appointment details
      const emailTemplate = notificationsTemplate(
        name,
        date.toLocaleDateString(),
        time,
        service
      );
      // send email
      await sendEmail(
        appointment.user.email,
        "Appointment Reminder",
        emailTemplate,
        undefined
      );
    }
  });
};

const notifyAppointmentsOnSixAM = async () => {
  // get appointments for today
  const date = new Date();
  // clear time
  date.setHours(0, 0, 0, 0);
  const appointments = await db.appointment.findMany({
    where: {
      date,
    },
    select: {
      date: true,
      timeSlot: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      service: {
        select: {
          service: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  appointments.forEach(async (appointment) => {
    const appointmentTime = timeSlotMap[appointment.timeSlot];
    if (appointmentTime - currentHour === 3) {
      // appointment details
      const name = `${appointment.user.firstName} ${appointment.user.lastName}`;
      const service = appointment.service.service.name;
      const time = `${timeSlotMap[appointment.timeSlot]}:00 - ${
        timeSlotMap[appointment.timeSlot] + 1
      }:00`;
      // email template update with appointment details
      const emailTemplate = notificationsTemplate(
        name,
        date.toLocaleDateString(),
        time,
        service
      );
      // send email
      await sendEmail(
        appointment.user.email,
        "Appointment Reminder",
        emailTemplate,
        undefined
      );
    }
  });
};

// run every day at 6am
cron.schedule("0 6 * * *", notifyAppointmentsOnSixAM);
// run every hour
cron.schedule("0 * * * *", notifyAppointmentsBeforeThreeHour);
