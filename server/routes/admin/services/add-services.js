const { addServicesSchema } = require("../../../validations/admin");
const { addService } = require("../../../utils/services");
const { db } = require("../../../lib/db");

const addNewService = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validated data
    const validatedData = addServicesSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { name, price, description, beauticians } = validatedData.data;

    // check all beauticians are available
    const beautician = beauticians.find(async (beautician) => {
      const beauticianExists = await db.beautician.findUnique({
        where: {
          id: beautician,
        },
      });

      return !beauticianExists;
    });

    // check if beautician exists
    if (!beautician) {
      return res.status(404).json({
        error: "Beautician not found.",
      });
    }

    // create service
    const service = await addService(
      {
        name,
        price,
        description,
      },
      beauticians
    );

    // check if service is created
    if (!service) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(201).json({
      message: "Service added successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = addNewService;
