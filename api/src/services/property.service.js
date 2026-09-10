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

export const deleteProperty = async (propertyId, userId) => {
  const property = await Property.findOneAndDelete({
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

export const updatePropertyLocation = async (
  propertyId,
  location,
  userId
) => {
  const { latitude, longitude } = location;

  if (latitude === undefined || longitude === undefined) {
    const error = new Error("Latitude and longitude are required");
    error.statusCode = 400;
    throw error;
  }

  if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    const error = new Error("Invalid coordinates");
    error.statusCode = 400;
    throw error;
  }

  const property = await Property.findOneAndUpdate(
    {
      _id: propertyId,
      owner: userId,
    },
    {
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  return property;
};

export const searchProperties = async (
  userId,
  query,
  filters = {},
  page = 1,
  limit = 10
) => {
  const { type, minRent, maxRent } = filters;

  const conditions = {
    owner: userId,
  };

  if (query && query.trim()) {
    const search = query.trim();

    conditions.$or = [
      { title: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
    ];
  }

  if (type) {
    conditions.type = type;
  }

  if (minRent !== undefined || maxRent !== undefined) {
    conditions.rent = {};

    if (minRent !== undefined) {
      conditions.rent.$gte = Number(minRent);
    }

    if (maxRent !== undefined) {
      conditions.rent.$lte = Number(maxRent);
    }
  }

  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find(conditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Property.countDocuments(conditions),
  ]);

  return {
    properties,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};