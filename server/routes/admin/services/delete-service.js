const { deleteService } = require("../../../utils/services");

const deleteExistingService = async (req, res) => {
  try {
    // get service id from request params
    const { serviceId } = req.params;

    // delete service
    const deletedService = await deleteService(serviceId);

    // check if service is deleted
    if (!deletedService) {
      return res.status(404).json({
        error: "Service not found.",
      });
    }

    return res.status(200).json({
      message: "Service deleted successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = deleteExistingService;
