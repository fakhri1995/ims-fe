import { useEffect, useState } from "react";

import { formatDateToLocale } from "lib/date-utils";

/**
 * Custom hook untuk handle feature realtime clock ticking pada halaman Attendance.
 *
 * @param realtimeFormat Format untuk si Timer (realtime ticking value). Default HH:mm:ss.
 * @param attendSafeHour Batas waktu absen yang dinyatakan aman (belum terlambat). Default 8. Jam 8 pagi, format 0-23.
 */
export const useCheckInOutTimer = (
  realtimeFormat: string = "HH:mm:ss",
  attendSafeHour: number = 8
) => {
  if (attendSafeHour < 0 || attendSafeHour > 23) {
    throw new Error("Argument `attendSafeHour` hanya valid dengan rentan 0-23");
  }

  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsMounted(true);

    const timeTicker = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timeTicker);
  }, []);

  return {
    /** Clock ticker */
    currentTime: isMounted
      ? formatDateToLocale(currentTime, realtimeFormat)
      : "",
    /** Date hari ini dengan locale indonesia dan timezone asia jakarta */
    currentDate: isMounted
      ? formatDateToLocale(currentTime, "EEEE, d MMMM yyyy")
      : "",
    /** Validasi apakah `currentTime` sudah melewati batas aman absen (terlambat atau tidaknya) */
    isOverAttendTime: isMounted
      ? currentTime.getHours() > attendSafeHour
      : false,
  };
};
