const { db } = require("../../lib/db");

const submitBeauticianResumes = async (req, res) => {
  try {
    // check user is logged in
    if (!req.user) {
      return res.status(401).json({
        error: "You must be logged in to upload a resume",
      });
    }

    const { branch } = req.body;

    // check if branch is provided
    if (!branch) {
      return res.status(400).json({
        error: "Branch is required",
      });
    }

    // check user is a beautician
    const beautician = await db.beautician.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    // check if the user is a beautician
    if (!beautician) {
      return res.status(400).json({
        error: "You must be a beautician to upload a resume",
      });
    }

    // check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }
    // check if the file is a pdf
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        error: "Only PDF files are allowed",
      });
    }

    // save the file path to the database
    const updatedBeautician = await db.beautician.update({
      where: {
        id: beautician.id,
      },
      data: {
        resume: req.file.path,
        isApproved: "PENDING",
        branch,
      },
    });

    // get user details again
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        emailVerified: true,
        beautician: {
          select: {
            id: true,
            isApproved: true,
            branch: true,
            qr: true,
          },
        },
      },
    });

    // if the file path was saved successfully
    if (updatedBeautician) {
      return res.status(200).json({
        message: "File uploaded successfully",
        user,
      });
    } else {
      return res.status(500).json({
        error: "Failed to upload file",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { submitBeauticianResumes };
