const { db } = require("../../../lib/db");
const { getServiceById, updateService } = require("../../../utils/services");
const { addServicesSchema } = require("../../../validations/admin");

const updateExistingService = async (req, res) => {
  try {
    // get service id
    const serviceId = req.params.serviceId;

    // get data from request body
    const data = req.body;
    // validated data
    const validatedData = await addServicesSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { name, price, description, beauticians } = validatedData.data;

    // existing service
    const service = await getServiceById(serviceId);

    // check if service exists
    if (!service) {
      return res.status(404).json({
        error: "Service not found.",
      });
    }

    let isUpdateFailed = false;

    const updatedService = await updateService(serviceId, {
      name,
      price,
      description,
    });

    // check if service is updated
    if (!updatedService) {
      return res.status(500).json({
        error: "Failed to update service.",
      });
    }

    // add beauticians to service if record not exists
    beauticians.forEach(async (beauticianId) => {
      const beauticianService = await db.beauticianService.findFirst({
        where: {
          serviceId,
          beauticianId,
        },
      });

      // check if beautician service exists
      if (!beauticianService) {
        const newBeauticianService = await db.beauticianService.create({
          data: {
            serviceId,
            beauticianId,
          },
        });

        // check if beautician service is created
        if (!newBeauticianService) {
          isUpdateFailed = true;
          return;
        }
      }
    });

    // check if service is updated
    if (isUpdateFailed) {
      return res.status(500).json({
        error: "Failed to update service.",
      });
    }

    return res.status(200).json({
      message: "Service updated successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = updateExistingService;
