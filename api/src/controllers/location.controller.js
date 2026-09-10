import {
  reverseGeocode,
  searchLocation,
} from "../services/location.service.js";

export const getLocation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;

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

    const location = await reverseGeocode(latitude, longitude);

    res.status(200).json({
      success: true,
      data: {
        location,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const { query } = req.query;

    const locations = await searchLocation(query);

    res.status(200).json({
      success: true,
      data: { locations },
    });
  } catch (error) {
    next(error);
  }
};