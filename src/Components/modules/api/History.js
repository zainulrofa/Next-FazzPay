import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history`;

// const config = (token) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// export const getHistory = (token, params) =>
//   axios.get(`${baseUrl}/history`, config(token), params);

export const getHistory = (token, params) => {
  return axios({
    method: "GET",
    url: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
