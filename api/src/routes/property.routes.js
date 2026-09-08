import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
} from "../controllers/property.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.patch("/:id", authenticate, update);

export default router;