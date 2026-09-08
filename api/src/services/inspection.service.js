import Inspection from "../models/Inspection.js";
import Property from "../models/Property.js";

export const createInspection = async (data, userId) => {
  const { property, notes } = data;

  if (!property) {
    const error = new Error("Property is required");
    error.statusCode = 400;
    throw error;
  }

  const existingProperty = await Property.findOne({
    _id: property,
    owner: userId,
  });

  if (!existingProperty) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  const inspection = await Inspection.create({
    property,
    inspector: userId,
    notes,
    status: "draft",
    rooms: [],
  });

  return inspection;
};

export const getInspections = async (userId) => {
  const inspections = await Inspection.find({
    inspector: userId,
  })
    .populate("property", "title type address city")
    .sort({ createdAt: -1 });

  return inspections;
};

export const getInspectionById = async (inspectionId, userId) => {
  const inspection = await Inspection.findOne({
    _id: inspectionId,
    inspector: userId,
  }).populate("property", "title type address city");

  if (!inspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  return inspection;
};

export const addRoom = async (inspectionId, userId, data) => {
  const { name, notes } = data;

  if (!name || !name.trim()) {
    const error = new Error("Room name is required");
    error.statusCode = 400;
    throw error;
  }

  const inspection = await Inspection.findOne({
    _id: inspectionId,
    inspector: userId,
  });

  if (!inspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  inspection.rooms.push({
    name: name.trim(),
    notes: notes || "",
  });

  await inspection.save();

  return inspection;
};

export const updateInspection = async (
  inspectionId,
  userId,
  data
) => {
  const inspection = await Inspection.findOne({
    _id: inspectionId,
    inspector: userId,
  });

  if (!inspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  if (data.status !== undefined) {
    inspection.status = data.status;
  }

  if (data.notes !== undefined) {
    inspection.notes = data.notes;
  }

  await inspection.save();

  return inspection;
};

export const deleteInspection = async (inspectionId, userId) => {
  const inspection = await Inspection.findOneAndDelete({
    _id: inspectionId,
    inspector: userId,
  });

  if (!inspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  return inspection;
};