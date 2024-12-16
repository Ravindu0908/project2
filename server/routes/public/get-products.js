const { db } = require("../../lib/db");
const {
  getProducts,
  getProductByProductCode,
} = require("../../utils/products");

// get products
const getAllProducts = async (req, res) => {
  try {
    // get all products
    const products = await getProducts();

    // get user id from request
    const id = req.user?.id;
    let cart = [];
    // get cart items
    if (id) {
      cart = await db.cart.findMany({
        where: {
          userId: id,
        },
        include: {
          product: true,
        },
      });
    }

    // create a new array of product ids from cart items
    const cartProductIds = cart.map((item) => item.product.productCode);

    // check if products are found
    if (!products) {
      return res.status(200).json({
        products: [],
        cart: [],
      });
    }

    return res.status(200).json({
      products,
      cart: cartProductIds,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

// get specific product
const getSpecificProduct = async (req, res) => {
  try {
    // get product code from request params
    const { productCode } = req.params;

    // get product by product code
    const product = await getProductByProductCode(productCode);

    // check if product is found
    if (!product) {
      return res.status(200).json({
        product: null,
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = { getAllProducts, getSpecificProduct };
