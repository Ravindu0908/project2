const { deletePackage, getPackageById } = require("../../../utils/packages");

const deleteExistingPackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const packages = await getPackageById(packageId);

    if (!packages) {
      return res.status(404).json({ error: "Package not found" });
    }

    const deleted = await deletePackage(packageId);

    if (!deleted) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteExistingPackage };
