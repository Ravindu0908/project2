const { addPackage } = require("../../../utils/packages");
const { addPackageSchema } = require("../../../validations/admin");

const addNewPackage = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = addPackageSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const {
      name,
      services,
      branches,
      description,
      normalPrice,
      discountedPrice,
    } = validatedData.data;

    // create package
    const package = await addPackage(
      {
        name,
        description,
        normalPrice,
        discountedPrice,
      },
      services,
      branches
    );

    // check if package isn't created
    if (!package) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(201).json({ message: "Package created successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { addNewPackage };
