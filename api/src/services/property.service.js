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

export const getProperties = async (userId) => {
  const properties = await Property.find({ owner: userId })
    .sort({ createdAt: -1 });

  return properties;
};

export const getPropertyById = async (propertyId, userId) => {
  const property = await Property.findOne({
    _id: propertyId,
    owner: userId,
  });

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  return property;
};

export const updateProperty = async (propertyId, userId, data) => {
  const property = await Property.findOne({
    _id: propertyId,
    owner: userId,
  });

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "title",
    "type",
    "address",
    "city",
    "description",
    "bedrooms",
    "bathrooms",
    "rent",
    "contact",
    "photos",
    "location",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      property[field] = data[field];
    }
  });

  await property.save();

  return property;
};