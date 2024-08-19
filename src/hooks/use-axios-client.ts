import axios, { AxiosRequestConfig } from "axios";
import { useMemo } from "react";

import { getClientToken } from "lib/auth";

/**
 * A React custom hook to use axios client with token attached on it.
 *
 * NOTE: hook ini akan selalu re-create axios instance ketika digunakan.
 * TODO: seharusnya ga begitu. Jadiin context atau global variable.
 */
export const useAxiosClient = (contentType?: string) => {
  const token = getClientToken();

  const tokenizedAxiosClient = useMemo(() => {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": contentType ?? "application/json",
      },
    };

    if (token !== "") {
      axiosConfig.headers["Authorization"] = token;
    }

    const axiosClient = axios.create(axiosConfig);

    return axiosClient;
  }, [token]);

  return tokenizedAxiosClient;
};
