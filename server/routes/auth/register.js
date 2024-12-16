const bcrypt = require("bcryptjs");
const { registerSchema } = require("../../validations/auth");
const { generateVerificationCode } = require("../../utils/verification-codes");
const { verifyEmailTemplate } = require("../../templates/verification");
const { sendEmail } = require("../../utils/emails");
const { getUserByEmail, getUserByPhoneNumber } = require("../../utils/users");
const { db } = require("../../lib/db");

const register = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = registerSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get data from validated data
    const { email, firstName, lastName, password, phoneNumber, role } =
      validatedData.data;

      // check role is valid
    if (role !== "CLIENT" && role !== "BEAUTICIAN") {
      return res.status(400).json({
        error: "Invalid role.",
      });
    }
    // check if user with email already exists
    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({
        error: "User with this email already exists.",
      });
    }

    // check if user with phone number already exists
    const userByPhoneNumber = await getUserByPhoneNumber(phoneNumber);

    if (userByPhoneNumber) {
      return res.status(400).json({
        error: "User with this phone number already exists.",
      });
    }

    // id no user found with email
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
        role,
        password: hashedPassword,
      },
    });

    //if user is beautician
    if (role === "BEAUTICIAN") {
      await db.beautician.create({
        data: {
          userId: newUser.id,
        },
      });
    }

    // get verification code
    const verificationCode = await generateVerificationCode(email);

    // get verification email template
    const emailTemplate = verifyEmailTemplate(
      verificationCode,
      firstName + " " + lastName
    );

    // send email to user
    const isSuccess = sendEmail(
      email,
      "Verify Your Email",
      emailTemplate,
      undefined
    );

    if (!isSuccess) {
      return res.status(500).json({
        error: "Failed to send verification email.",
      });
    }

    return res.status(200).json({
      success: "Verification email sent.",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = register;
