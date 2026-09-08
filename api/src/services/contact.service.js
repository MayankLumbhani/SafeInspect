import Contact from "../models/Contact.js";

export const createContact = async (data, userId) => {
  const { name, phone, email, notes } = data;

  if (!name || !phone) {
    const error = new Error("Name and phone are required");
    error.statusCode = 400;
    throw error;
  }

  const contact = await Contact.create({
    name,
    phone,
    email,
    notes,
    owner: userId,
  });

  return contact;
};