const { db } = require("../lib/db");

// create new package
const addPackage = async (data, services, branches) => {
  try {
    const package = await db.packages.create({
      data,
    });

    // add services to package service table
    services?.forEach(async (service) => {
      await db.packageServices.create({
        data: {
          serviceId: service,
          packageId: package.id,
        },
      });
    });

    // add branches to package branch table
    branches?.forEach(async (branch) => {
      await db.packageBranches.create({
        data: {
          branch: branch,
          packageId: package.id,
        },
      });
    });

    // get the package with services and branches
    const newPackage = await db.packages.findUnique({
      where: {
        id: package.id,
      },
      include: {
        services: true,
        branches: true,
      },
    });

    return newPackage;
  } catch (err) {
    return null;
  }
};

// get all packages
const getPackages = async () => {
  try {
    const packages = await db.packages.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        normalPrice: true,
        discountedPrice: true,
        services: {
          select: {
            service: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        branches: {
          select: {
            branch: true,
          },
        },
      },
    });

    return packages;
  } catch (err) {
    return null;
  }
};

// get package by id
const getPackageById = async (id) => {
  try {
    const package = await db.packages.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        normalPrice: true,
        discountedPrice: true,
        services: {
          select: {
            service: {
              select: {
                name: true,
              },
            },
          },
        },
        branches: {
          select: {
            branch: true,
          },
        },
      },
    });

    return package;
  } catch (err) {
    return null;
  }
};

//update package
const updatePackage = async (id, data, services, branches) => {
  try {
    // update package
    const updated = await db.packages.update({
      where: {
        id,
      },
      data,
    });

    // if package not updated
    if (!updated) {
      return null;
    }

    // delete existing services
    await db.packageServices.deleteMany({
      where: {
        packageId: id,
      },
    });

    // delete existing branches
    await db.packageBranches.deleteMany({
      where: {
        packageId: id,
      },
    });

    // add services to package service table
    services.forEach(async (service) => {
      await db.packageServices.create({
        data: {
          serviceId: service,
          packageId: id,
        },
      });
    });

    // add branches to package branch table
    branches.forEach(async (branch) => {
      await db.packageBranches.create({
        data: {
          branch: branch,
          packageId: id,
        },
      });
    });

    // get the package with services and branches
    const updatedPackage = await db.packages.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
        branches: true,
      },
    });

    return updatedPackage;
  } catch (err) {
    return null;
  }
};

// delete package
const deletePackage = async (id) => {
  try {
    // delete package
    const deleted = await db.packages.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    // if package not deleted
    if (!deleted) {
      return null;
    }

    return deleted;
  } catch (err) {
    return null;
  }
};

module.exports = {
  addPackage,
  getPackages,
  updatePackage,
  deletePackage,
  getPackageById,
};
