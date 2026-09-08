import { createMedia } from "../services/media.service.js";

export const uploadMedia = async (req, res, next) => {
  try {

    const media = await createMedia(
      req.body,
      req.file,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: { media },
    });
  } catch (error) {
    next(error);
  }
};