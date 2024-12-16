const {
  getProductByProductCode,
  updateProduct,
} = require("../../../utils/products");
const { addProductSchema } = require("../../../validations/admin");

// update products
const updateExistingProduct = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = addProductSchema.safeParse(data);
    // get post id
    const productId = req.params.productCode;

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { name, productCode, price, stock, description } = validatedData.data;

    // if not same check if product with product code already exists
    const existingProduct = await getProductByProductCode(productCode);

    // check productId and productCode are same
    if (productId !== productCode) {
      // if product with product code already exists
      if (existingProduct) {
        return res.status(400).json({
          error: "Product with this product code already exists.",
        });
      }
    }

    // create product image array
    let images = null;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => {
        return file.path;
      });
    }

    // update product
    const product = await updateProduct(
      productId,
      {
        name,
        productCode,
        price,
        stock,
        description,
      },
      images
    );

    // check if product is updated
    if (!product) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = updateExistingProduct;
