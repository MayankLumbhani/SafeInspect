import Property from "../models/Property.js";
import Contact from "../models/Contact.js";
import Inspection from "../models/Inspection.js";

export const getDashboardStats = async (userId) => {
  const [
    totalProperties,
    totalContacts,
    totalInspections,
    completedInspections,
    pendingInspections,
  ] = await Promise.all([
    Property.countDocuments({ owner: userId }),
    Contact.countDocuments({ owner: userId }),
    Inspection.countDocuments({ inspector: userId }),
    Inspection.countDocuments({
      inspector: userId,
      status: "completed",
    }),
    Inspection.countDocuments({
      inspector: userId,
      status: { $in: ["draft", "in_progress"] },
    }),
  ]);

  return {
    totalProperties,
    totalContacts,
    totalInspections,
    completedInspections,
    pendingInspections,
  };
};