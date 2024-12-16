const { db } = require("../../../lib/db");

const getLeaves = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;
    // get user and beautician
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
        beautician: {
          select: {
            id: true,
          },
        },
      },
    });
    // if user isn't a beautician or user is a beautician but doesn't have a beautician id
    if (user.role !== "BEAUTICIAN" || !user.beautician) {
      return res.status(400).json({ error: "You are not a beautician." });
    }
    // get all leaves
    const leaves = await db.leaves.findMany({
      where: {
        beauticianId: user.beautician.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // return leaves
    return res.json({ leaves });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { getLeaves };
