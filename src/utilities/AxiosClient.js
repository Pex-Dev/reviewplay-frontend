import axios from "axios";
import Cookies from "js-cookie";

// Crear cliente
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  withXSRFToken: false,
});

const getCsrfToken = async () => {
  try {
    await axiosClient.get("/sanctum/csrf-cookie");

    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (!csrfToken) throw new Error("No se pudo obtener el token CSRF");

    return csrfToken;
  } catch (error) {
    console.error("Error obteniendo CSRF:", error);
    throw error;
  }
};

// Interceptor de respuesta
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 419 y aún no se ha reintentado
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Pedir token CSRF fresc
      const csrfToken = await getCsrfToken();

      // Reintentar la peticion con el token correcto
      return axiosClient({
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          "X-XSRF-TOKEN": csrfToken,
        },
      });
    }

    return Promise.reject(error);
  },
);

// Hacer POST con CSRF
export const postWithCsrf = async (url, data, config = {}) => {
  const csrfToken = await getCsrfToken();
  return axiosClient.post(url, data, {
    ...config,
    headers: {
      ...config.headers,
      "X-XSRF-TOKEN": csrfToken,
    },
  });
};

export default axiosClient;
