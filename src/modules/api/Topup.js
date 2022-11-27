import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const topUp = (body, token) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/top-up`;
  return axios.post(URL, body, config(token));
};
