import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

/**
 * Formatting date into Indonesian (locale) format.
 *
 * @param date Date value to be formatted
 * @param dateFormat Format in string
 * @returns string
 */
export const formatDateToLocale = (date: number | Date, dateFormat: string) => {
  return format(date, dateFormat, { locale: idLocale });
};
