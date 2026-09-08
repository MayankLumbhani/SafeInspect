import { createInspection } from "../services/inspection.service.js";

export const create = async (req, res, next) => {
  try {
    const inspection = await createInspection(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: { inspection },
    });
  } catch (error) {
    next(error);
  }
};