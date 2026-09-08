import { Router } from "express";
import {
  create,
  getAll,
  getOne,
} from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);

export default router;