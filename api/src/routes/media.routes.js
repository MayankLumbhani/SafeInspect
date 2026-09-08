import { Router } from "express";
import { uploadMedia } from "../controllers/media.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadMedia
);

export default router;