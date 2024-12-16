const { db } = require("../lib/db");

// get all products
const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        productCode: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        images: {
          select: {
            image: true,
          },
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// get product by id
const getProductByProductCode = async (id) => {
  try {
    const product = await db.product.findUnique({
      where: {
        productCode: id,
        isDeleted: false,
      },
      select: {
        productCode: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        images: {
          select: {
            image: true,
          },
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

// add product
const addProduct = async (product, images) => {
  try {
    const newProduct = await db.product.create({
      data: product,
    });

    //  add images to product image table
    images.forEach(async (image) => {
      await db.productImages.create({
        data: {
          image,
          productId: newProduct.id,
        },
      });
    });

    return newProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// update product
const updateProduct = async (id, product, images = null) => {
  try {
    const updatedProduct = await db.product.update({
      where: {
        productCode: id,
      },
      data: product,
    });
    //  add images to product image table
    if (images !== null) {
      // delete existing images
      await db.productImages.deleteMany({
        where: {
          productId: updatedProduct.id,
        },
      });

      images.forEach(async (image) => {
        await db.productImages.create({
          data: {
            image,
            productId: updatedProduct.id,
          },
        });
      });
    }
    return updatedProduct;
  } catch (error) {
    return null;
  }
};

// delete product
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await db.product.update({
      where: {
        productCode: id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedProduct;
  } catch (error) {
    return null;
  }
};
// add review for product
const addReview = async (productId, orderId, rating, comment) => {
  try {
    const newReview = await db.review.create({
      data: {},
    });

    return newReview;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getProducts,
  getProductByProductCode,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
