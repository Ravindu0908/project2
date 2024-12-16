const {
  beauticiansApprovedTemplate,
} = require("../../../templates/beautician-approved");
const {
  beauticiansRejectedTemplate,
} = require("../../../templates/beautician-rejected");
const { db } = require("../../../lib/db");
const { sendEmail } = require("../../../utils/emails");
const QRCode = require("qrcode");

// approve beautician account
const approveBeauticianAccount = async (req, res) => {
  try {
    const { beauticianId } = req.params;
    const beautician = await db.beautician.findUnique({
      where: {
        id: beauticianId,
      },
      include: {
        user: true,
      },
    });
    if (!beautician) {
      return res.status(404).json({ error: "Beautician not found" });
    }
    if (beautician.status === "VERIFIED") {
      return res.status(400).json({ error: "Beautician is already approved" });
    }

    const qrText = {
      email: beautician.user.email,
      firstName: beautician.user.firstName,
      lastName: beautician.user.lastName,
      phoneNumber: beautician.user.phoneNumber,
      branch: beautician.branch,
    };

    const fileName = `uploads/qr/${beautician.user.email}.png`;

    QRCode.toFile(
      `${fileName}`,
      JSON.stringify(qrText),
      {
        color: {
          dark: "#00F",
          light: "#fff",
        },
      },
      (err) => {
        if (err) throw err;
      }
    );

    await db.beautician.update({
      where: {
        id: beauticianId,
      },
      data: {
        isApproved: "VERIFIED",
        qr: fileName,
      },
    });

    // get beautician approve email template
    const emailTemplate = beauticiansApprovedTemplate(
      beautician.user.firstName + " " + beautician.user.lastName,
      "http://localhost:3000/login"
    );

    // send email to beautician
    const isSuccess = await sendEmail(
      beautician.user.email,
      "Beautician Account Approved",
      emailTemplate,
      undefined
    );

    if (!isSuccess) {
      return res.status(500).json({
        error: "Failed to send email",
      });
    }

    res.json({ message: "Beautician account approved" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// reject beautician account approval
const rejectBeauticianAccount = async (req, res) => {
  try {
    const { beauticianId } = req.params;
    const reason = "Your account has been rejected.";

    // if no reason provided
    if (!reason) {
      return res.status(400).json({
        error: "Please provide a reason",
      });
    }
    const beautician = await db.beautician.findUnique({
      where: {
        id: beauticianId,
      },
      include: {
        user: true,
      },
    });
    if (!beautician) {
      return res.status(404).json({ error: "Beautician not found" });
    }
    if (beautician.status === "REJECTED") {
      return res.status(400).json({ error: "Beautician is already rejected" });
    }
    await db.beautician.update({
      where: {
        id: beauticianId,
      },
      data: {
        isApproved: "REJECTED",
      },
    });

    // get beautician reject email template
    const emailTemplate = beauticiansRejectedTemplate(
      beautician.user.firstName + " " + beautician.user.lastName,
      "http://localhost:3000/beautician",
      reason
    );

    // send email to beautician
    const isSuccess = await sendEmail(
      beautician.user.email,
      "Beautician Account Rejected",
      emailTemplate,
      undefined
    );

    if (!isSuccess) {
      return res.status(500).json({
        error: "Failed to send email",
      });
    }

    res.json({ message: "Beautician account rejected" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// get pending beautician accounts
const getPendingBeauticianAccounts = async (req, res) => {
  try {
    const beauticians = await db.beautician.findMany({
      where: {
        isApproved: "PENDING",
      },
      include: {
        user: {
          select: {
            email: true,
            phoneNumber: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.json({ beauticians: beauticians });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  approveBeauticianAccount,
  getPendingBeauticianAccounts,
  rejectBeauticianAccount,
};
