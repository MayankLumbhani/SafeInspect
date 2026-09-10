import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  searchContacts,
} from "../services/contact.service.js";

export const create = async (req, res, next) => {
  try {
    const contact = await createContact(req.body, req.user.userId);

    res.status(201).json({
      success: true,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const contacts = await getContacts(req.user.userId);

    res.status(200).json({
      success: true,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const contact = await getContactById(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const contact = await updateContact(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteContact(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const contacts = await searchContacts(
      req.user.userId,
      req.query.query
    );

    res.status(200).json({
      success: true,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};