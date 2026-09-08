import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import inspectionRoutes from "./routes/inspection.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SafeInspect API is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/inspections", inspectionRoutes);

app.use(errorHandler);

export default app;