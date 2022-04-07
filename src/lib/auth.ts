import Cookies from "js-cookie";

export const TOKEN_COOKIE_NAME = "token";

/**
 * Retrieve token string from cookie.
 *
 * @returns string Stripped string (without quotation mark).
 */
export const getClientToken = (): string => {
  return Cookies.get(TOKEN_COOKIE_NAME)?.replace(/"/g, "") || "";
};
