import { Router } from "express";
import {
  uploadMedia,
  getMediaByInspection,
  deleteMediaById,
} from "../controllers/media.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get(
  "/inspection/:inspectionId",
  authenticate,
  getMediaByInspection
);

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadMedia
);

router.delete(
  "/:id",
  authenticate,
  deleteMediaById
);

export default router;