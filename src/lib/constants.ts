/**
 * Konstanta sebagai acuan kapan waktu aman untuk melakukan absen.
 * Jika lewat dari waktu ini, maka akan dinyatakan terlambat
 *
 * HOUR: 0-23
 * MINUTE: 0-59
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes
 */
export const ATTENDANCE_SAFE_TIME = {
  HOUR: 8,
  MINUTE: 15,
};
