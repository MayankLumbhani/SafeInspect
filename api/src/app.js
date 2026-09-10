import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import inspectionRoutes from "./routes/inspection.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import locationRoutes from "./routes/location.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SafeInspect API is running",
  });
});

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/inspections", inspectionRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;