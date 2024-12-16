const { db } = require("../../lib/db");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        appointmentId: {
          not: null,
        },
      },
      select: {
        comment: true,
        rating: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

module.exports = { getAllReviews };
