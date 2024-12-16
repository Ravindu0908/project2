const { getPackages, getPackageById } = require("../../utils/packages");

// get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await getPackages();
    return res.status(200).json({ packages });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// get package by id
const getExistingPackageById = async (req, res) => {
  try {
    // get package id from params
    const { packageId } = req.params;

    const packages = await getPackageById(packageId);

    return res.status(200).json({ packages });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getAllPackages, getExistingPackageById };
