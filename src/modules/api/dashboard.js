import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`;
const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const statisticApi = (token, id) => {
  const url = `${baseUrl}/${id}`;
  return axios.get(url, config(token));
};
