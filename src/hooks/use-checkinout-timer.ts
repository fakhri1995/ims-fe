import { isAfter } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { ATTENDANCE_SAFE_TIME } from "lib/constants";
import { formatDateToLocale } from "lib/date-utils";

/**
 * Custom hook untuk handle feature realtime clock ticking pada halaman Attendance.
 *
 * @param realtimeFormat Format untuk si Timer (realtime ticking value). Default HH:mm:ss.
 * @param attendSafeHour Batas waktu absen yang dinyatakan aman (belum terlambat). Default 8. Jam 8 pagi, format 0-23.
 * @param attendSafeMinute Sama seperti `attendSafeHour` namun untuk nilai menit. Default 15. Lewat 15 menit, format 1-60.
 *
 * @returns {{ currentTime: string; currentDate: string; isOverAttendTime: boolean; }} Nilai `currentTime` atau `currentDate` akan === "" ketika component baru saja di mount.
 */
export const useCheckInOutTimer = (
  realtimeFormat: string = "HH:mm:ss",
  attendSafeHour: number = ATTENDANCE_SAFE_TIME.HOUR,
  attendSafeMinute: number = ATTENDANCE_SAFE_TIME.MINUTE
) => {
  if (attendSafeHour < 0 || attendSafeHour > 23) {
    throw new Error("Argument `attendSafeHour` hanya valid dengan rentan 0-23");
  }

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeTicker = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timeTicker);
  }, []);

  /**
   * It's necessary to memoized this date instance. We do not need to update each interval.
   */
  const attendComparabableTime = useMemo(
    () =>
      new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        attendSafeHour,
        attendSafeMinute,
        0
      ),
    [attendSafeHour, attendSafeMinute]
  );

  return {
    /** Clock ticker */
    currentTime: formatDateToLocale(currentTime, realtimeFormat),
    /** Date hari ini dengan locale indonesia dan timezone asia jakarta */
    currentDate: formatDateToLocale(currentTime, "EEEE, d MMMM yyyy"),
    /** Validasi apakah `currentTime` sudah melewati batas aman absen (terlambat atau tidaknya) */
    isOverAttendTime: isAfter(currentTime, attendComparabableTime),
  };
};
