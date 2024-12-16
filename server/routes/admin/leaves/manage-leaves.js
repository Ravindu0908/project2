const { db } = require("../../../lib/db");

const getExistingLeaves = async (req, res) => {
  try {
    // get all leaves
    const leaves = await db.leaves.findMany({
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
    // return leaves
    return res.json({ leaves });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const approveLeave = async (req, res) => {
  try {
    // get leave id
    const { leaveId } = req.params;
    // update leave request
    const leave = await db.leaves.update({
      where: {
        id: leaveId,
      },
      data: {
        status: "APPROVED",
      },
    });
    // if leave request is not updated
    if (!leave) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
    // return success message
    return res.json({ message: "Leave request approved successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const rejectLeave = async (req, res) => {
  try {
    // get leave id
    const { leaveId } = req.params;
    // update leave request
    const leave = await db.leaves.update({
      where: {
        id: leaveId,
      },
      data: {
        status: "REJECTED",
      },
    });
    // if leave request is not updated
    if (!leave) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
    // return success message
    return res.json({ message: "Leave request rejected successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { approveLeave, rejectLeave, getExistingLeaves };
