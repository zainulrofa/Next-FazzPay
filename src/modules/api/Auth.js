import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const register = (body) => axios.post(`${baseUrl}/register`, body);

export const login = (body) => axios.post(`${baseUrl}/login`, body);

export const logout = () => axios.post(`${baseUrl}/logout`);

export const forgotPassword = (body) =>
  axios.post(`${baseUrl}/forgot-password`, body);

export const resetPassword = (body) =>
  axios.post(`${baseUrl}/reset-password`, body);
