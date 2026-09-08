import {
  createProperty,
  getProperties,
} from "../services/property.service.js";

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

export const getAll = async (req, res, next) => {
  try {
    const properties = await getProperties(req.user.userId);

    res.status(200).json({
      success: true,
      data: { properties },
    });
  } catch (error) {
    next(error);
  }
};