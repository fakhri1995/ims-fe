import { GetServerSidePropsContext } from "next";

import httpcookie from "cookie";

export const TOKEN_COOKIE_NAME = "token";

/**
 * Server side function.
 *
 * A function to reads the cookie from incoming HTTP request headers and extract
 *  specifiec TOKEN_COOKIE_NAME from it.
 *
 * It does not validating the cookie to the backend. It just read and extract.
 *
 * @example
 * ```ts
 * const { token, hasNoToken } = parseToken(ctx);
 * if (hasNoToken) {
 *   // when there is no "token" in incoming HTTP request's cookie
 * }
 *
 * // token is exists but it's not always a valid token.
 * token;
 * ```
 */
export const parseToken = ({ req }: GetServerSidePropsContext) => {
  const { cookie } = req.headers;

  let hasNoToken = true;
  let token = "";

  if (cookie) {
    let cookies = httpcookie.parse(cookie);
    if (TOKEN_COOKIE_NAME in cookies) {
      hasNoToken = false;

      /** The token is being stringified on login though... */
      token = JSON.parse(cookies[TOKEN_COOKIE_NAME]);
    }
  }

  return { token, hasNoToken };
};
