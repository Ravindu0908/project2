const { db } = require("../../../lib/db");

const shipOrder = async (req, res) => {
  try {
    // order id
    const { orderId } = req.params;
    const { tracking } = req.body;
    // get order
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });
    // check if order exists
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    // update order status
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "SHIPPED",
        tracking,
      },
    });
    return res.status(200).json({
      message: "Order shipped",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { shipOrder };
