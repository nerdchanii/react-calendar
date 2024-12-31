import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
