const { db } = require("../../../lib/db");

const getBeauticians = async (req, res) => {
  try {
    // get all beauticians
    const beauticians = await db.beautician.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    // return beauticians
    return res.json({ beauticians });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const getBeauticianSalary = async (req, res) => {
  try {
    // get beautician id
    const { beauticianId } = req.params;
    // get beautician salary
    const salary = await db.payedSalary.findMany({
      where: {
        beauticianId: beauticianId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        beautician: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    // return salary
    return res.json({ salary });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { getBeauticians, getBeauticianSalary };
