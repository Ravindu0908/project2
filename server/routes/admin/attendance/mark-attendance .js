const { db } = require("../../../lib/db");
const { getUserByEmail } = require("../../../utils/users");

const markAttendance = async (req, res) => {
  try {
    // get beautician id from email
    const { email } = req.params;
    // get user id from email
    const user = await getUserByEmail(email);
    // if user not found
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    // get beautician id
    const beautician = await db.beautician.findUnique({
      where: {
        userId: user.id,
      },
    });
    // if beautician not found
    if (!beautician) {
      return res.status(404).json({ error: "Beautician not found!" });
    }
    // check if beautician already marked attendance
    const attendance = await db.attendance.findFirst({
      where: {
        beauticianId: beautician.id,
        date: new Date().toISOString().split("T")[0],
      },
    });
    // if attendance already marked add leave time
    if (attendance) {
      await db.attendance.update({
        where: {
          id: attendance.id,
        },
        data: {
          leaveTime: new Date().toISOString(),
        },
      });
      return res.json({ message: "Leave time marked successfully." });
    } else {
      // mark attendance
      await db.attendance.create({
        data: {
          beauticianId: beautician.id,
          date: new Date().toISOString().split("T")[0],
          enterTime: new Date().toISOString(),
        },
      });
      return res.json({ message: "Attendance marked successfully." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const getAttendanceByBeautician = async (req, res) => {
  try {
    // get beautician id from email
    const { email } = req.params;
    // get user id from email
    const user = await getUserByEmail(email);
    // if user not found
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    // get beautician id
    const beautician = await db.beautician.findUnique({
      where: {
        userId: user.id,
      },
    });
    // if beautician not found
    if (!beautician) {
      return res.status(404).json({ error: "Beautician not found!" });
    }
    // get attendance
    const attendance = await db.attendance.findMany({
      where: {
        beauticianId: beautician.id,
      },
    });
    // return attendance
    return res.json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByBeautician,
};
