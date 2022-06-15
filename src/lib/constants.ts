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

/**
 * Role tertinggi pada fitur Access Control.
 * User dengan role ini dapat access seluruh fitur.
 *
 * @see {AccessControlProvider}
 */
export const ROLE_SUPER_ADMIN = "Super Admin";

/**
 * Jumlah maximum upload file yang dapat dikirim ke backend.
 *
 * Terutama pada modul Task dan Ticket.
 */
export const MAX_FILE_UPLOAD_COUNT = 5;

/**
 * Moment.js date format yang dapat diterima oleh backend.
 */
export const DATE_MOMENT_FORMAT_PAYLOAD = "YYYY-MM-DD HH:mm:ss";
