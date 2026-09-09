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