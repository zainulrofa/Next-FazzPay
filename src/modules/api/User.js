import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDetailUser = (token, id) =>
  axios.get(`${baseUrl}/profile/${id}`, config(token));

export const checkPin = (token, pin) =>
  axios.get(`${baseUrl}/pin?pin=${pin}`, config(token));

export const editProfile = (token, id, body) =>
  axios.patch(`${baseUrl}/profile/${id}`, body, config(token));

export const editPhone = (token, id, body) =>
  axios.patch(`${baseUrl}/profile/${id}`, body, config(token));

export const editImage = (token, id, body) =>
  axios.patch(`${baseUrl}/image/${id}`, body, config(token));

export const editPin = (token, id, body) =>
  axios.patch(`${baseUrl}/pin/${id}`, body, config(token));

export const editPassword = (token, id, body) =>
  axios.patch(`${baseUrl}/password/${id}`, body, config(token));

export const deleteImage = (token, id) =>
  axios.delete(`${baseUrl}/image/${id}`, body, config(token));
