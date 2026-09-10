import {
  getDashboardStats,
  getRecentInspections,
  getRecentProperties,
  getRecentContacts,
} from "../services/dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const stats = await getDashboardStats(req.user.userId);

    const recentInspections = await getRecentInspections(
      req.user.userId
    );

    const recentProperties = await getRecentProperties(
      req.user.userId
    );

    const recentContacts = await getRecentContacts(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentInspections,
        recentProperties,
        recentContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};