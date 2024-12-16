const express = require("express");
const router = express.Router();
const { db } = require("../lib/db");
const updatePassword = require("./user/update-password");
const {
  updateUserDetails,
  uploadProfilePicture,
} = require("./user/update-user-details");
const multer = require("multer");

// custom error handling middleware for Multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // handle multer-specific errors
    res.status(400).send({ error: err.message });
  } else if (err) {
    // handle other errors
    res.status(500).send({ error: "An unexpected error occurred" });
  } else {
    next(); // no errors, proceed to the next middleware
  }
};

// storage for user profile image
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, `/${req.user.email}_${file.originalname}`);
  },
});

const uploadUser = multer({ storage: userStorage });

//logout route
router.post("/logout", (_, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logout successfully" });
});

// get user data route
router.get("/me", async (req, res) => {
  try {
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

    res.json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/image",
  uploadUser.single("profileImage"),
  multerErrorHandler,
  async (req, res) => {
    return await uploadProfilePicture(req, res);
  }
);

// update user details
router.put("/update-user", async (req, res) => {
  return await updateUserDetails(req, res);
});

// update password route
router.put("/update-password", async (req, res) => {
  return await updatePassword(req, res);
});

module.exports = router;
