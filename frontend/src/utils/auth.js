// Get auth token from localStorage or Redux store
export const getAuthToken = () => {
  try {
    // First try to get from localStorage (userInfo)
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user && user.token) {
        return user.token;
      }
    }

    // Also check for direct token storage
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }

    return null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Get user info from localStorage
export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};
