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

export const getContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId })
    .sort({ createdAt: -1 });

  return contacts;
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  });

  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }

  return contact;
};