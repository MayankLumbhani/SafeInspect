import Media from "../models/Media.js";
import Inspection from "../models/Inspection.js";
import fs from "fs/promises";
import path from "path";

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

export const getInspectionMedia = async (inspectionId, userId) => {
  const existingInspection = await Inspection.findOne({
    _id: inspectionId,
    inspector: userId,
  });

  if (!existingInspection) {
    const error = new Error("Inspection not found");
    error.statusCode = 404;
    throw error;
  }

  const media = await Media.find({
    inspection: inspectionId,
    uploadedBy: userId,
  }).sort({ createdAt: -1 });

  return media;
};

export const deleteMedia = async (mediaId, userId) => {
  const media = await Media.findOne({
    _id: mediaId,
    uploadedBy: userId,
  });

  if (!media) {
    const error = new Error("Media not found");
    error.statusCode = 404;
    throw error;
  }

  const filePath = path.resolve("uploads", media.filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await Media.findByIdAndDelete(mediaId);

  return media;
};