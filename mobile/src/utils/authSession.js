import { getToken, removeToken } from "../storage/authStorage";
import { getCurrentUser } from "../api/auth";

export const getAuthSession = async () => {
  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    const response = await getCurrentUser(token);

    return {
      token,
      user: response.data.user,
    };
  } catch (error) {
    await removeToken();
    return null;
  }
};
