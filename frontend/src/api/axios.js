import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api", //development
  baseURL: "https://codesync-backend-0xnc.onrender.com/api", //production

  withCredentials: true,
});