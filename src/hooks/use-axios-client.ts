import axios from "axios";
import Cookies from "js-cookie";
import { useMemo } from "react";

/**
 * A React custom hook to use axios client with token attached on it.
 */
export const useAxiosClient = () => {
  const token = JSON.parse(Cookies.get("token"));

  const tokenizedAxiosClient = useMemo(() => {
    const axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Authorization: token,
      },
    });

    return axiosClient;
  }, [token]);

  return { axiosClient: tokenizedAxiosClient };
};
