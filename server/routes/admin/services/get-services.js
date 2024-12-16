const { getServices } = require("../../../utils/services");

const getExistingServices = async (req, res) => {
  try {
    const services = await getServices();
    if (!services) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(200).json({
      services,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = getExistingServices;
