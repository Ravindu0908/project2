const { db } = require("../../lib/db");
const { updateAccountSchema } = require("../../validations/user");

const updateUserDetails = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // get user id from request
    const userId = req?.user?.id;
    // validate user data
    const validatedData = updateAccountSchema.safeParse(data);
    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        error: validatedData.error.errors,
      });
    }

    // check email is already exists
    const emailExists = await db.user.findFirst({
      where: {
        email: data.email,
        id: {
          not: userId,
        },
      },
    });

    if (emailExists) {
      return res.status(400).json({
        error: "Email already exists.",
      });
    }

    // check phone number is already exists
    const phoneNumberExists = await db.user.findFirst({
      where: {
        phoneNumber: data.phoneNumber,
        id: {
          not: userId,
        },
      },
    });

    if (phoneNumberExists) {
      return res.status(400).json({
        error: "Phone number already exists.",
      });
    }

    // update user details
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    });
    // send response
    res.json({
      message: "User details updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    // send response if any error occurs
    res.status(400).json({
      error: error.message,
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    // check if user data exists
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    // if exist data update
    if (user) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          profileImage: "uploads/users" + req.file.filename,
        },
      });
    } else {
      return res.status(400).json({
        error: "Please submit your profile details first.",
      });
    }

    const updatedUser = await db.user.findUnique({
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
        profileImage: true,
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

    return res.status(200).json({
      message: "Images uploaded successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = { updateUserDetails, uploadProfilePicture };
