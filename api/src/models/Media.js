import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    inspection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inspection",
      required: true,
    },

    room: {
      type: String,
      required: true,
      trim: true,
    },

    checklistItem: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    filename: {
      type: String,
      trim: true,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      trim: true,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", mediaSchema);