const { db } = require("../../../lib/db");

const addOrRemoveCart = async (req, res) => {
  try {
    // get user id from request
    const { id } = req.user;
    // get product id from request
    const { productId } = req.params;

    // if id is not set
    if (!id) {
      return res.status(401).json({
        error: "Unauthorized.",
      });
    }

    // if product id is not set
    if (!productId) {
      return res.status(400).json({
        error: "Product id is required.",
      });
    }

    // get product by id
    const product = await db.product.findFirst({
      where: {
        productCode: productId,
      },
    });

    // if product not found
    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    // check if product already in cart
    const existingCart = await db.cart.findFirst({
      where: {
        userId: id,
        productId: product.id,
      },
    });

    // if product already in cart
    if (existingCart) {
      // remove product from cart
      await db.cart.delete({
        where: {
          id: existingCart.id,
        },
      });

      return res.json({
        message: "Product removed from cart.",
      });
    }

    // add product to cart
    const cart = await db.cart.create({
      data: {
        userId: id,
        productId: product.id,
      },
    });

    // if product not added to cart
    if (!cart) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.json({
      message: "Product added to cart.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

const getCart = async (req, res) => {
  try {
    // get user id from request
    const { id } = req.user;
    // get cart items
    const cart = await db.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return res.json({
      cart,
    });
  } catch (e) {
    res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = { addOrRemoveCart, getCart };
