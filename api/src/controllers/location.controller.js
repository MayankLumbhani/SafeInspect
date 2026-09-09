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

    res.status(200).json({
      success: true,
      data: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
  } catch (error) {
    next(error);
  }
};