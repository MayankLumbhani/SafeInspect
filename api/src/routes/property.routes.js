import { Router } from "express";
import {
  create,
  getAll,
} from "../controllers/property.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);

export default router;