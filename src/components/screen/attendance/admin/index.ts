import dynamic from "next/dynamic";

export * from "./AttendanceAdminTodayStatCard";
export * from "./AttendanceAdminListSection";

/**
 * Leaflet can runs only in the client side. We need to import
 *  this module dynamically and add `ssr` to false.
 */
export const AttendanceAdminLeafletMapNoSSR = dynamic(
  () =>
    import("./AttendanceAdminLeafletMap").then(
      (module) => module.AttendanceAdminLeafletMap
    ),
  {
    ssr: false,
  }
);
