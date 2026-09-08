import Media from "../models/Media.js";
import Inspection from "../models/Inspection.js";

export const createMedia = async (data, file, userId) => {
  const {
    inspection,
    room,
    checklistItem,
  } = data;

  if (!inspection || !room) {
    const error = new Error("Inspection and room are required");
    error.statusCode = 400;
    throw error;
  }

  if (!file) {
    const error = new Error("Image file is required");
    error.statusCode = 400;
    throw error;
  }

  const existingInspection = await Inspection.findOne({
    _id: inspection,
    inspector: userId,
  });

  if (!existingInspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  const media = await Media.create({
    inspection,
    room,
    checklistItem: checklistItem || "",
    type: "image",
    url: `/uploads/${file.filename}`,
    filename: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    uploadedBy: userId,
  });

  return media;
};