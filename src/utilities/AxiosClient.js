import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export default axiosClient;
