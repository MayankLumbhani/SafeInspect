import mongoose from "mongoose";

const inspectionSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "in_progress", "completed"],
      default: "draft",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    rooms: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },

          notes: {
            type: String,
            trim: true,
            default: "",
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inspection", inspectionSchema);