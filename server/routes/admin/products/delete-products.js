const { deleteProduct } = require("../../../utils/products");

// delete product
const deleteExistingProduct = async (req, res) => {
  try {
    // get product code from request params
    const { productCode } = req.params;

    // delete product
    const deletedProduct = await deleteProduct(productCode);

    // check if product is deleted
    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = deleteExistingProduct;
