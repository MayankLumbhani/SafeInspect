import Property from "../models/Property.js";
import Contact from "../models/Contact.js";
import Inspection from "../models/Inspection.js";
import mongoose from "mongoose";

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

export const getRecentInspections = async (userId) => {
  const inspections = await Inspection.find({
    inspector: userId,
  })
    .populate("property", "title address city")
    .sort({ createdAt: -1 })
    .limit(5);

  return inspections;
};

export const getRecentProperties = async (userId) => {
  const properties = await Property.find({
    owner: userId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  return properties;
};

export const getRecentContacts = async (userId) => {
  const contacts = await Contact.find({
    owner: userId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  return contacts;
};

export const getInspectionStatusSummary = async (userId) => {
  const summary = await Inspection.aggregate([
    {
      $match: {
        inspector: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    draft: 0,
    in_progress: 0,
    completed: 0,
  };

  summary.forEach((item) => {
    result[item._id] = item.count;
  });

  return result;
};