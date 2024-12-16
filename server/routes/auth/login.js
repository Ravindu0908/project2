const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../validations/auth");
const { generateVerificationCode } = require("../../utils/verification-codes");
const { verifyEmailTemplate } = require("../../templates/verification");
const { sendEmail } = require("../../utils/emails");
const { getUserByEmail } = require("../../utils/users");

const login = async (req, res) => {
  try {
    // get data from request body
    const data = req.body;
    // validate data
    const validatedData = loginSchema.safeParse(data);

    // check if data is valid
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    // get validated data
    const { email, password } = validatedData.data;

    // check if user with email exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        error: "User with this email does not exist.",
      });
    }

    // is user did't not verify email
    if (!user.emailVerified) {
      // get verification code
      const verificationCode = await generateVerificationCode(email);

      // get verification email template
      const emailTemplate = verifyEmailTemplate(
        verificationCode,
        user.firstName + " " + user.lastName
      );

      // send email to user
      const isSuccess = sendEmail(
        email,
        "Email verification",
        emailTemplate,
        undefined
      );

      if (!isSuccess) {
        return res.status(500).json({
          error: "Failed to send verification email.",
        });
      }

      return res.status(200).json({
        error: "Verification email sent.",
      });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if password is not correct
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Wrong password.",
      });
    }

    //jwt content
    const jwtContent = {
      id: user.id,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };

    const accessToken = jwt.sign(jwtContent, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30 days",
    });

    res.cookie("access_token", accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    //navigation based on role
    const navigate =
      user.role === "ADMIN"
        ? "/admin"
        : user.role === "BEAUTICIAN"
        ? "/beautician"
        : "/client";

    // success response
    return res.status(200).json({
      success: "Logged in.",
      navigate,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = login;
