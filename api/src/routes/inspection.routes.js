import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  addRoomToInspection,
  update,
} from "../controllers/inspection.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.post("/:id/rooms", authenticate, addRoomToInspection);
router.patch("/:id", authenticate, update);

export default router;