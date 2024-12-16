const { db } = require("../../lib/db");

const getAllServices = async (req, res) => {
  const { beauticianId } = req.params;
  try {
    if (beauticianId === undefined) {
      const services = await db.service.findMany({
        where: {
          isDeleted: false,
        },
        select: { id: true, name: true },
      });
      res.status(200).json({
        services,
      });
    } else {
      const services = await db.beauticianService.findMany({
        where: {
          beauticianId: beauticianId,
        },
        select: {
          id: true,
          service: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json({
        services,
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { getAllServices };
