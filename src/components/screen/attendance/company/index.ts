import dynamic from "next/dynamic";

export * from "./AttendanceCompanyTodayStatCard";
export * from "./AttendanceCompanyListSection";

/**
 * Leaflet can runs only in the client side. We need to import
 *  this module dynamically and add `ssr` to false.
 */
export const AttendanceCompanyLeafletMapNoSSR = dynamic(
  () =>
    import("./AttendanceCompanyLeafletMap").then(
      (module) => module.AttendanceCompanyLeafletMap
    ),
  {
    ssr: false,
  }
);
