import { createContact } from "../services/contact.service.js";

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