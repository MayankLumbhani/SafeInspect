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