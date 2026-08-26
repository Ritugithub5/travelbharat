import axios from "axios";

export const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://travelbharat-073a.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },

  // IMPORTANT:
  // Do NOT use withCredentials for JWT Authorization.
  withCredentials: false,
});

// Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "🚀 API Request:",
      config.method?.toUpperCase(),
      `${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
api.interceptors.response.use(
  (response) => {
    console.log(
      "✅ API Response:",
      response.status,
      response.config.url
    );

    return response;
  },
  (error) => {
    console.error(
      "❌ API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;