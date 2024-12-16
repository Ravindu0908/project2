const { db } = require("../lib/db");

// function for getting users by their email
const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

//get all users with pagination
const getAllUsers = async (page, limit) => {
  try {
    const users = await db.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        emailVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        isDeleted: true,
        beautician: {
          select: {
            isApproved: true,
            branch: true,
            qr: true,
            resume: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    return null;
  }
};

// get user by their id
const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// get beautician by their user id
const getBeauticianByUserId = async (userId) => {
  try {
    const beautician = await db.beautician.findFirst({
      where: {
        userId,
      },
    });
    return beautician;
  } catch (error) {
    return null;
  }
};

// function for getting users by their email
const getUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await db.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// function for getting verification code by user email
const getVerificationCodeByEmail = async (email) => {
  try {
    const verificationCode = await db.verificationCodes.findFirst({
      where: {
        email,
      },
    });
    return verificationCode;
  } catch (error) {
    return null;
  }
};

// function for getting password reset code by user email
const getPasswordResetCodeByEmail = async (email) => {
  try {
    const passwordResetCode = await db.passwordResetCode.findFirst({
      where: {
        email,
      },
    });
    return passwordResetCode;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  getUserByPhoneNumber,
  getVerificationCodeByEmail,
  getPasswordResetCodeByEmail,
  getBeauticianByUserId,
};
