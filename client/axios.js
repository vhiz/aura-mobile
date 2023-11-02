import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.43.121:3001/api",
  withCredentials: true,
});

export const notify = async ({title, body, to}) => {
  await axios.post("https://exp.host/--/api/v2/push/send", {
    to,
    title,
    body,
  });
};
