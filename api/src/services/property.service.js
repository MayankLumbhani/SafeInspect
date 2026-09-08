import Property from "../models/Property.js";

export const createProperty = async (data, userId) => {
  const {
    title,
    type,
    address,
    city,
    description,
    bedrooms,
    bathrooms,
    rent,
    contact,
    photos,
    location,
  } = data;

  if (!title || !type || !address || !city || rent === undefined) {
    const error = new Error(
      "Title, type, address, city, and rent are required"
    );
    error.statusCode = 400;
    throw error;
  }

  const property = await Property.create({
    title,
    type,
    address,
    city,
    description,
    bedrooms,
    bathrooms,
    rent,
    contact,
    photos,
    location,
    owner: userId,
  });

  return property;
};