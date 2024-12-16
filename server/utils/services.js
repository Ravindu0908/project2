const { db } = require("../lib/db");

// get all services
const getServices = async () => {
  try {
    const services = await db.service.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        service: {
          select: {
            beautician: {
              select: {
                branch: true,
                user: {
                  select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    profileImage: true,
                    role: true,
                    emailVerified: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return services;
  } catch (error) {
    return null;
  }
};

// get service by id
const getServiceById = async (id) => {
  try {
    const service = await db.service.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        name: true,
        description: true,
        price: true,
        service: true,
      },
    });
    return service;
  } catch (error) {
    return null;
  }
};

// add service
const addService = async (service, beautician) => {
  try {
    const newService = await db.service.create({
      data: service,
    });

    // add new beauticianService
    beautician?.forEach(async (beauticianId) => {
      await db.beauticianService.create({
        data: {
          serviceId: newService.id,
          beauticianId,
        },
      });
    });

    return newService;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// update service
const updateService = async (id, service) => {
  try {
    const updatedService = await db.service.update({
      where: {
        id,
      },
      data: service,
    });

    return updatedService;
  } catch (error) {
    return null;
  }
};

// delete service
const deleteService = async (id) => {
  try {
    const deletedService = await db.service.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedService;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
};
