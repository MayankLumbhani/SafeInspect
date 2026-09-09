import { Router } from "express";
import { getLocation } from "../controllers/location.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/current",
  authenticate,
  getLocation
);

export default router;