import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import { icon } from "leaflet";
import type { LeafletEventHandlerFnMap } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { FC, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCES_USERS_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

import styles from "./AttendanceAdminLeafletMap.module.scss";

/**
 * Component AttendanceAdminLeafletMap's props.
 */
export interface IAttendanceAdminLeafletMap {}

/**
 * Component AttendanceAdminLeafletMap
 */
export const AttendanceAdminLeafletMap: FC<IAttendanceAdminLeafletMap> = () => {
  return (
    <div className="w-full h-[260px] bg-slate-50 rounded-[10px] border border-mono80 overflow-hidden ">
      <MapContainer
        center={[-1.62, 113.23]}
        maxZoom={18}
        zoom={5}
        className={"markercluster-map w-full h-full".concat(
          " ",
          styles["custom-map-cluster"]
        )}
      >
        <TileLayer
          attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3VrdWgxOTkzIiwiYSI6ImNsZnQwdzM3cDAzc2EzdHBlMzVnbWgzcWsifQ.Lz4OP8-_edU-ld1GwfPqdQ"
          id="mapbox/streets-v11"
          tileSize={512}
          zoomOffset={-1}
        />

        <AttendanceMarkers />
      </MapContainer>
    </div>
  );
};

/**
 * @private
 */
type AttendanceMarkerDataType = {
  staffName: string;

  checkInLocation: {
    latlng: [number, number];
    displayName?: string;
  };
};

/**
 * @private
 */
const AttendanceMarkers: FC = () => {
  const map = useMap();
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendancesUsers = hasPermission(ATTENDANCES_USERS_GET);

  const { data } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET],
    () => AttendanceService.findAsAdmin(axiosClient),
    {
      enabled: isAllowedToGetAttendancesUsers,
      select: (response) =>
        response.data.data.users_attendances.map((attendance) => ({
          staffName: attendance.user.name,
          checkInLocation: {
            latlng: [+attendance.lat_check_in, +attendance.long_check_in],
            displayName: attendance.geo_loc_check_in?.display_name,
          },
        })) as AttendanceMarkerDataType[],
    }
  );

  const attendanceMarkerIcon = useMemo(
    () =>
      icon({
        iconUrl: "/image/leaflet/location-pin.png",
        iconSize: [48, 48],
      }),
    []
  );

  const markerHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      click: (event) => {
        /** Higher zoom === zoom in */
        const zoomThreshold = 12;
        const currentZoom = map.getZoom();

        if (currentZoom < zoomThreshold) {
          map.flyTo(event.latlng, Math.max(zoomThreshold, map.getZoom()));
        }
      },
      mouseover: (e) => e.target.openPopup(),
      mouseout: (e) => e.target.closePopup(),
    }),
    []
  );

  if (!data) {
    return null;
  }

  return (
    <MarkerClusterGroup showCoverageOnHover={false}>
      {data.map((attendanceMarker, idx) => (
        <Marker
          key={idx}
          position={attendanceMarker.checkInLocation.latlng}
          icon={attendanceMarkerIcon}
          eventHandlers={markerHandlers}
        >
          <Popup>
            <p className="text-mono30">
              <strong>Nama:</strong> {attendanceMarker.staffName}
            </p>
            <p className="text-mono30">
              <strong>Alamat: </strong>{" "}
              {attendanceMarker.checkInLocation.displayName || "-"}
            </p>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
