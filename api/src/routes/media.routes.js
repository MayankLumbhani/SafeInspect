import { Router } from "express";
import {
  uploadMedia,
  getMediaByInspection,
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


export default router;