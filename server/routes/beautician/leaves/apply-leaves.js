
const { db } = require("../../../lib/db");
const { applyLeaveSchema } = require("../../../validations/user");

const applyLeaves = async (req, res) => {
  try {
    // get user id
    const id = req.user.id;
    // get data from request body
    const data = req.body;
    // get user and beautician details
    const user = await db.user.findUnique({
      where: {
        id,
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
    // validate data
    const validatedData = applyLeaveSchema.safeParse(data);

    // if data is invalid
    if (!validatedData.success) {
      return res.status(400).json({ errors: validatedData.error.errors });
    }
    // destructure data
    const { startDate, endDate, reason } = validatedData.data;

    // format dates
    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);
    // set time to 00:00:00
    startDateFormatted.setHours(0, 0, 0, 0);
    endDateFormatted.setHours(0, 0, 0, 0);

    // create leave request
    const leave = await db.leaves.create({
      data: {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        reason,
        beauticianId: user.beautician.id,
      },
    });
    // if leave request is not created
    if (!leave) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
    // return success message
    return res.json({ message: "Leave request applied successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { applyLeaves };
