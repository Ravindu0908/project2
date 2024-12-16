const { db } = require("../lib/db");

// get all cart items
const getCartItems = async (userId) => {
  try {
    const cartItems = await db.cart.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        product: {
          select: {
            productCode: true,
            name: true,
            description: true,
            price: true,
            image: true,
            stock: true,
          },
        },
      },
    });
    return cartItems;
  } catch (error) {
    return null;
  }
};

// add item to cart
const addItemToCart = async (userId, productId) => {
  try {
    const cartItem = await db.cart.create({
      data: {
        userId,
        productId,
      },
    });
    return cartItem;
  } catch (error) {
    return null;
  }
};

// remove item from cart
const removeItemFromCart = async (id) => {
  try {
    const cartItem = await db.cart.delete({
      where: {
        id,
      },
    });
    return cartItem;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
};
