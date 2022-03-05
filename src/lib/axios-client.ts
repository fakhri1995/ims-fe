import axios, { AxiosInstance } from "axios";

let axiosClient: AxiosInstance | null = null;

export const getAxiosClient = (token?: string) => {
  if (axiosClient) {
    return axiosClient;
  }

  axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  if (token) {
    axiosClient.defaults.headers.common = {
      Authorization: token,
    };
  }

  return axiosClient;
};
