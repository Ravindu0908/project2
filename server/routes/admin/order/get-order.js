const { db } = require("../../../lib/db");

const getOrders = async (req, res) => {
  try {
    // get orders
    const orders = await db.order.findMany({
      select: {
        id: true,
        status: true,
        total: true,
        user: {
          select: {
            phoneNumber: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        products: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        address: {
          select: {
            city: true,
            state: true,
            address: true,
            street: true,
            zipCode: true,
          },
        },
      },
    });
    return res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getOrders };
