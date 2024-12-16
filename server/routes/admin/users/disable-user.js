const { db } = require("../../../lib/db");

const disableUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // get user by id
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    // disable or enable user based on current status
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: !user.isDeleted,
      },
    });

    // return updated user disabled status
    if (updatedUser) {
      return res.json({
        message: `User ${
          user.isDeleted ? "enabled" : "disabled"
        } successfully.`,
      });
    }

    return res.status(500).json({
      error: "An error occurred while disabling the user.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while disabling the user.",
    });
  }
};

module.exports = { disableUser };
