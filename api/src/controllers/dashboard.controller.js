import {
  getDashboardStats,
  getRecentInspections,
  getRecentProperties,
  getRecentContacts,
  getInspectionStatusSummary,
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

    const inspectionStatus = await getInspectionStatusSummary(
  req.user.userId
);

    res.status(200).json({
      success: true,
      data: {
        stats,
        inspectionStatus,
        recentInspections,
        recentProperties,
        recentContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};