import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(MONGODB_URI);

  console.log("MongoDB connected");
};

export default connectDB;