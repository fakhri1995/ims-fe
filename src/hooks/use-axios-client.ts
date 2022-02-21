import axios from "axios";
import { useMemo } from "react";
import { useCookies } from "react-cookie";

/**
 * A React custom hook to use axios client with token attached on it.
 */
export const useAxiosClient = () => {
  const [cookies] = useCookies(["token"]);

  const tokenizedAxiosClient = useMemo(() => {
    const axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Authorization: cookies.token,
      },
    });

    return axiosClient;
  }, [cookies.token]);

  return { axiosClient: tokenizedAxiosClient };
};
