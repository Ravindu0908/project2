const { db } = require("../../lib/db");
const bcrypt = require("bcryptjs");
const { getUserById } = require("../../utils/users");
const { updatePasswordSchema } = require("../../validations/user");

// update password
const updatePassword = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = updatePasswordSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { oldPassword, newPassword } = validatedData.data;

    // check if old password is same as new password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        error: "Old password and new password can not be same.",
      });
    }

    // get user from request
    const userId = req.user.id;

    //get user by id
    const user = await getUserById(userId);

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    // check if old password is correct
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Current password is incorrect.",
      });
    }

    // id no user found with email
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    // check if user is updated
    if (!updatedUser) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      error: "Something went wrong. -2",
    });
  }
};

module.exports = updatePassword;
