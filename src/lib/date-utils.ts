import { formatInTimeZone } from "date-fns-tz";
import idLocale from "date-fns/locale/id";

/**
 * Formatting date into Indonesian (locale) format.
 *
 * @param date Date value to be formatted
 * @param dateFormat Format in string
 * @param fallbackValue A fallback value in case `formatInTimeZone` catch an error.
 * @returns string
 */
export const formatDateToLocale = (
  date: number | Date,
  dateFormat: string,
  fallbackValue?: string
) => {
  let result = "";

  try {
    result = formatInTimeZone(
      date,
      "Asia/Jakarta",
      dateFormat
      // {
      //   locale: idLocale,
      // }
    );
  } catch {
    result = fallbackValue || "";
  } finally {
    return result;
  }
};
