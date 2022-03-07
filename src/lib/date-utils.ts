import { formatInTimeZone } from "date-fns-tz";
import idLocale from "date-fns/locale/id";

/**
 * Formatting date into Indonesian (locale) format.
 *
 * @param date Date value to be formatted
 * @param dateFormat Format in string
 * @returns string
 */
export const formatDateToLocale = (date: number | Date, dateFormat: string) => {
  if (!date) {
    return "";
  }

  return formatInTimeZone(date, "Asia/Jakarta", dateFormat, {
    locale: idLocale,
  });
};
