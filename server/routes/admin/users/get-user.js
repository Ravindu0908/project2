const { getAllUsers } = require("../../../utils/users");

const getUsers = async (req, res) => {
  try {
    // get page from query
    const page = parseInt(req.query.page) || 1;
    const users = await getAllUsers(page, 20);
    return res.status(200).json({
      users,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
};

module.exports = getUsers;
