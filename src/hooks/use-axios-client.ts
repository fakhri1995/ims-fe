import axios from "axios";
import { useMemo } from "react";
import { useCookies } from "react-cookie";

/**
 * A React custom hook to use axios client with token attached on it.
 *
 * This function will produce a new AxiosInstance and use hook `useCookies` to
 *  retrieve the token.
 */
export const useAxiosClient = () => {
  const [cookies] = useCookies(["token"]);

  const tokenizedAxiosClient = useMemo(() => {
    const axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Authorization: cookies.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return axiosClient;
  }, [cookies.token]);

  return tokenizedAxiosClient;
};
