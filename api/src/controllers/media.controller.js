import {
  createMedia,
  getInspectionMedia,
} from "../services/media.service.js";

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

export const getMediaByInspection = async (req, res, next) => {
  try {
    const media = await getInspectionMedia(
      req.params.inspectionId,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: { media },
    });
  } catch (error) {
    next(error);
  }
};