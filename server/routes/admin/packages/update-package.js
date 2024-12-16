const { updatePackage } = require("../../../utils/packages");
const { addPackageSchema } = require("../../../validations/admin");

const updateExistingPackage = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // get package id from request params
    const { packageId } = req.params;
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

    // update package
    const package = await updatePackage(
      packageId,
      {
        name,
        description,
        normalPrice,
        discountedPrice,
      },
      services,
      branches
    );

    // check if package isn't updated
    if (!package) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(200).json({ message: "Package updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { updateExistingPackage };
