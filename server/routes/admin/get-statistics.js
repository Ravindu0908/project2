const { db } = require("../../lib/db");

const getStatistics = async (req, res) => {
  // get the number of users
  const users = await db.user.count();
  // get the number of approved beauticians
  const beauticians = await db.beautician.count({
    where: { isApproved: "VERIFIED" },
  });
  // get the number of pending appointments
  const appointments = await db.appointment.count({
    where: { status: "PENDING" },
  });

  // get all orders in last 12 months
  const last12MonthOrders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
  });

  // get all reserved appointments in last 12 months
  const last12MonthAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
  });

  // count the number of orders by month if any month has no orders it will return 0
  const ordersByMonth = last12MonthOrders.reduce((acc, order) => {
    const month = order.createdAt.getMonth();
    acc[month] = acc[month] ? acc[month] + 1 : 1;
    return acc;
  }, {});
  // add 0 to the months that have no orders
  for (let i = 0; i < 12; i++) {
    if (!ordersByMonth[i]) {
      ordersByMonth[i] = 0;
    }
  }

  // count the number of appointments by month if any month has no appointments it will return 0
  const appointmentsByMonth = last12MonthAppointments.reduce(
    (acc, appointment) => {
      const month = appointment.date.getMonth();
      acc[month] = acc[month] ? acc[month] + 1 : 1;
      return acc;
    },
    {}
  );
  // add 0 to the months that have no appointments
  for (let i = 0; i < 12; i++) {
    if (!appointmentsByMonth[i]) {
      appointmentsByMonth[i] = 0;
    }
  }

  // re-order months from next month to current month with month name
  const statByMonth = [];
  const nextMonth = new Date().getMonth() + 1;
  for (let i = 0; i < 12; i++) {
    const month = (nextMonth + i) % 12;
    statByMonth.push({
      month: month,
      monthName: new Date(0, month).toLocaleString("default", {
        month: "long",
      }),
      orders: ordersByMonth[month],
      appointments: appointmentsByMonth[month],
    });
  }

  // return the statistics
  res.status(200).json({
    users,
    beauticians,
    appointments,
    statByMonth,
  });
};

module.exports = getStatistics;
