import { createProperty } from "../services/property.service.js";

export const create = async (req, res, next) => {
  try {
    const property = await createProperty(req.body, req.user.userId);

    res.status(201).json({
      success: true,
      data: { property },
    });
  } catch (error) {
    next(error);
  }
};