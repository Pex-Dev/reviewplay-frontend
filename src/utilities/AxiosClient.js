import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  withXSRFToken: true,
});

// Función para obtener CSRF
const getCsrfCookie = async () => {
  try {
    await axiosClient.get("/sanctum/csrf-cookie");
  } catch (error) {
    console.error("Error obteniendo CSRF:", error);
  }
};

// Interceptor de respuesta
axiosClient.interceptors.response.use(
  (response) => response, // Todo bien
  async (error) => {
    const originalRequest = error.config;

    // Si es un 419 y no hemos reintentado aún
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Pedir un nuevo CSRF
      await getCsrfCookie();

      // Reintentar la petición original
      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
