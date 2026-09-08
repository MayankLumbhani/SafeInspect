import {
  createInspection,
  getInspections,
  getInspectionById,
  addRoom,
  updateInspection,
} from "../services/inspection.service.js";

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

export const getAll = async (req, res, next) => {
  try {
    const inspections = await getInspections(req.user.userId);

    res.status(200).json({
      success: true,
      data: { inspections },
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const inspection = await getInspectionById(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: { inspection },
    });
  } catch (error) {
    next(error);
  }
};

export const addRoomToInspection = async (req, res, next) => {
  try {
    const inspection = await addRoom(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: { inspection },
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const inspection = await updateInspection(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: { inspection },
    });
  } catch (error) {
    next(error);
  }
};