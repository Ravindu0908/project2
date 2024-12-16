const {
  addProduct,
  getProductByProductCode,
} = require("../../../utils/products");
const { addProductSchema } = require("../../../validations/admin");

// add products
const addNewProduct = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = addProductSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { name, productCode, price, stock, description } = validatedData.data;

    // check product with product code already exists
    const existingProduct = await getProductByProductCode(productCode);

    // if product with product code already exists
    if (existingProduct) {
      return res.status(400).json({
        error: "Product with this product code already exists.",
      });
    }

    // create product image array
    let images = ["uploads/products/default.png"];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => {
        return file.path;
      });
    }

    // create product
    const product = await addProduct(
      {
        name,
        productCode,
        price,
        stock,
        description,
      },
      images
    );

    // check if product is created
    if (!product) {
      console.log("product none");
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(201).json({
      message: "Product added successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = addNewProduct;
