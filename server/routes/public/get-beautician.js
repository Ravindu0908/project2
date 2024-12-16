const { db } = require("../../lib/db");

const getBeauticianByBranch = async (req, res) => {
  try {
    // get branch
    const { branch } = req.params;
    if (branch) {
      const beauticians = await db.beautician.findMany({
        where: {
          isApproved: "VERIFIED",
          branch,
        },
        select: {
          id: true,
          branch: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
        },
      });
      const groupedBeauticians = groupByBranch(beauticians);
      return res.status(200).json({ beauticians: groupedBeauticians });
    }
    const beauticians = await db.beautician.findMany({
      where: {
        isApproved: "VERIFIED",
      },
      select: {
        id: true,
        branch: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    // group by branch
    const groupedBeauticians = groupByBranch(beauticians);

    return res.status(200).json({ beauticians: groupedBeauticians });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBeauticianByBranchAndService = async (req, res) => {
  try {
    // get branch
    const { branch, service } = req.params;
    const beauticians = await db.beautician.findMany({
      where: {
        isApproved: "VERIFIED",
        ...(branch !== undefined && { branch: branch }),
        ...(service !== undefined && {
          service: {
            some: {
              serviceId: service,
            },
          },
        }),
      },

      select: {
        id: true,
        branch: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
    const groupedBeauticians = groupByBranch(beauticians);
    return res.status(200).json({ beauticians: groupedBeauticians });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const groupByBranch = (beauticians) => {
  // group by branch
  const branchBeauticians = beauticians.reduce((acc, beautician) => {
    const branch = beautician.branch;
    if (!acc[branch]) {
      acc[branch] = [];
    }
    acc[branch].push(beautician);
    return acc;
  }, {});

  return branchBeauticians;
};

module.exports = { getBeauticianByBranch, getBeauticianByBranchAndService };
