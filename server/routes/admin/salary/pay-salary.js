const { db } = require("../../../lib/db");

const paySalaries = async (req, res) => {
  try {
    // get beautician id
    const { beauticianId } = req.params;
    //get available salary for beautician
    const beautician = await db.beautician.findUnique({
      where: {
        id: beauticianId,
      },
    });

    // add salary to beautician
    const salary = await db.payedSalary.create({
      data: {
        beauticianId: beauticianId,
        amount: beautician.currentSalary,
        month: (new Date().getMonth() + 1).toString(),
        year: new Date().getFullYear().toString(),
      },
    });

    // update beautician salary to 50000
    await db.beautician.update({
      where: {
        id: beauticianId,
      },
      data: {
        currentSalary: 50000,
      },
    });

    // return success message
    return res.json({ message: "Salary payed successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { paySalaries };
