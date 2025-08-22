// config/api.ts
import axios from "axios";

export const loginApi = (data: { username: string; password: string }) =>
  axios.post("http://localhost:3000/api/auth/login", data);

export const registerApi = (data: FormData) =>
  axios.post("http://localhost:3000/api/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getUsersApi = () => {
  const token = localStorage.getItem("token");
  return axios.get("http://localhost:3000/api/user/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserByIdApi = (userId: string) => {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:3000/api/user/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
