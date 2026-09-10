import { Router } from "express";
import {
  getLocation,
  search,
} from "../controllers/location.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/current",
  authenticate,
  getLocation
);

router.get(
  "/search",
  authenticate,
  search
);

export default router;