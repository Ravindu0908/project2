const { db } = require("../lib/db");

const refundAppointmentFee = async (id) => {
  try {
    const payment = await db.payment.updateMany({
      where: {
        appointmentId: id,
      },
      data: {
        status: "REFUNDED",
      },
    });

    /**
     * @TODO
     * Refund process need to implement with hosted environment
     */

    return payment;
  } catch (e) {
    console.log(e)
    return null;
  }
};

const refundProduct = async (id, product) => {
  try {
    const payment = await db.payment.updateMany({
      where: {
        appointmentId: id,
        order: {
          products: {
            productId: product,
          },
        },
      },
      data: {
        status: "REFUNDED",
      },
    });

    /**
     * @TODO
     * Refund process need to implement with hosted environment
     */

    return payment;
  } catch (e) {
    return null;
  }
};

module.exports = { refundAppointmentFee, refundProduct };
