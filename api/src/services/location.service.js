import axios from "axios";

export const reverseGeocode = async (latitude, longitude) => {
    const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
            params: {
                lat: latitude,
                lon: longitude,
                format: "json",
            },
            headers: {
                "User-Agent": "SafeInspect/1.0",
            },
        }
    );

    return {
        address: response.data.display_name || "",
        latitude: Number(latitude),
        longitude: Number(longitude),
    };
};

export const searchLocation = async (query) => {
  if (!query || !query.trim()) {
    const error = new Error("Search query is required");
    error.statusCode = 400;
    throw error;
  }

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: query.trim(),
        format: "json",
        limit: 5,
      },
      headers: {
        "User-Agent": "SafeInspect/1.0",
      },
    }
  );

  return response.data.map((item) => ({
    address: item.display_name,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  }));
};