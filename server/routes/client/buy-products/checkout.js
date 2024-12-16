const { db } = require("../../../lib/db");
const { getUserById } = require("../../../utils/users");
const {
  checkOutProductsSchema,
  finishAppointmentSchema,
} = require("../../../validations/user");
const md5 = require("md5");

const getAddress = async (req, res) => {
  try {
    // get user id from request
    const { id } = req.user;

    // if id is not set
    if (!id) {
      return res.status(401).json({
        error: "Unauthorized.",
      });
    }

    // get user address
    const address = await db.address.findMany({
      where: {
        userId: id,
      },
      select: {
        address: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
      },
    });

    // return success response
    return res.status(200).json({
      address,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const checkOutProducts = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // user id
    const { id } = req.user;
    // get user
    const user = await getUserById(id);

    // validate products
    const validatedData = checkOutProductsSchema.safeParse(data);

    // if validation fails
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get products from validated data
    const { products, address, city, state, street, zipCode } =
      validatedData.data;

    // check available products and calculate total amount
    let totalAmount = 0;
    products.forEach(async (product) => {
      const productData = await db.product.findFirst({
        where: {
          id: product.productId,
        },
      });

      if (!productData) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      totalAmount += productData.price * product.quantity;
    });

    // check matching address with user
    let checkAddress = await db.address.findFirst({
      where: {
        userId: req.user.id,
        address,
        city,
        state,
        street,
        zipCode,
      },
    });

    // id address is not found create new address
    if (!checkAddress) {
      checkAddress = await db.address.create({
        data: {
          userId: id,
          address,
          city,
          state,
          street,
          zipCode,
        },
      });
    }

    // create pending order
    const order = await db.order.create({
      data: {
        userId: id,
        total: totalAmount,
        addressId: checkAddress?.id,
      },
    });

    // if order is not created
    if (!order) {
      return res.status(400).json({
        error: "Order not created.",
      });
    }

    // create order items
    products.forEach(async (product) => {
      await db.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.productId,
          quantity: product.quantity,
        },
      });
    });

    // delete pending order after 15 minutes
    setTimeout(() => {
      deletePendingOrder(order.id);
    }, 1 * 60 * 1000);

    // generate payment hashes
    const hash = md5(
      process.env.PAYHERE_MERCHANT_ID +
        order.id +
        totalAmount.toFixed(2) +
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
        order_id: order.id,
        items: `Order Id- ${order.id}`,
        currency: "LKR",
        amount: totalAmount,
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const completeCheckOut = async (req, res) => {
  try {
    // get order id from request
    const { orderId } = req.params;

    // get order data
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: true,
      },
    });

    // if order not found
    if (!order) {
      return res.status(404).json({
        error: "Order not found.",
      });
    }

    // update order status
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CONFIRMED",
      },
    });

    // add payment details
    const payment = await db.payment.create({
      data: {
        orderId,
        amount: order.total,
        userId: order.userId,
      },
    });

    // if payment not created
    if (!payment) {
      return res.status(500).json({
        error: "Payment not created.",
      });
    }

    // remove item from cart
    order.products.forEach(async (product) => {
      await db.cart.deleteMany({
        where: {
          userId: order.userId,
          productId: product.productDd,
        },
      });
    });

    // return success response
    return res.status(200).json({
      message: "Order placed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deletePendingOrder = async (id) => {
  try {
    // get order data
    const order = await db.order.findUnique({
      where: {
        id,
      },
    });

    // if order not found
    if (!order) {
      return false;
    }

    // delete order details
    if (order.status === "PENDING") {
      // delete order items
      await db.orderItem.deleteMany({
        where: {
          orderId: id,
        },
      });

      // delete order
      await db.order.delete({
        where: {
          id,
        },
      });
    }

    // return success
    return true;
  } catch (error) {
    return false;
  }
};

const finishOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    // if order id is not set
    if (!orderId) {
      return res.status(400).json({
        error: "Order id is required.",
      });
    }
    const order = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "DELIVERED",
      },
    });

    if (!order) {
      return res.status(500).json({
        error: "Order not delivered.",
      });
    }

    return res.status(200).json({
      message: "Order delivered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const addReviewForItem = async (req, res) => {
  try {
    const { productId, orderId } = req.params;
    // get data from request body
    const data = req.body;
    // if product id and order id is not set
    if (!productId || !orderId) {
      return res.status(400).json({
        error: "Product id and order id is required.",
      });
    }

    // check product and order exists
    const order = await db.orderItem.findFirst({
      where: {
        orderId,
        productId,
      },
    });

    // if order not found
    if (!order) {
      return res.status(404).json({
        error: "Order not found.",
      });
    }

    // validate review data
    const validatedData = finishAppointmentSchema.safeParse(data);
    // if validation fails
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // destructure data
    const { rating, comment } = validatedData.data;

    // add review for product
    const review = await db.review.create({
      data: {
        productId,
        orderItemId: order.id,
        rating,
        comment,
        orderItemId: order.id,
        userId: req.user.id,
      },
    });

    // if review not created
    if (!review) {
      return res.status(500).json({
        error: "Review not created.",
      });
    }

    // return success response
    return res.status(200).json({
      message: "Review added successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const getClientOrders = async (req, res) => {
  try {
    // get user id
    const { id } = req.user;
    const orders = await db.orderItem.findMany({
      where: {
        order: {
          userId: id,
        },
      },
      include: {
        order: {
          include: {
            address: true,
          },
        },
        product: {
          include: {
            images: true,
          },
        },
        review: true,
      },
    });
    return res.status(200).json({
      orders,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

module.exports = {
  checkOutProducts,
  completeCheckOut,
  getAddress,
  finishOrder,
  addReviewForItem,
  getClientOrders,
};
