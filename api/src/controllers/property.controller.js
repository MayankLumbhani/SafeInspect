import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
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

export const getOne = async (req, res, next) => {
  try {
    const property = await getPropertyById(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: { property },
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const property = await updateProperty(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: { property },
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteProperty(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};