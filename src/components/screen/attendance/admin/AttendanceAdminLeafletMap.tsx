import { icon } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useGeolocationAPI } from "hooks/use-geolocation-api";

/**
 * Component AttendanceAdminLeafletMap's props.
 */
export interface IAttendanceAdminLeafletMap {}

/**
 * Component AttendanceAdminLeafletMap
 */
export const AttendanceAdminLeafletMap: FC<IAttendanceAdminLeafletMap> = () => {
  const dummyPositions = useMemo<[number, number][]>(
    () => [
      [-7.21, 109.65],
      [-7.73, 111.69],
    ],
    []
  );

  return (
    <div className="w-full h-full bg-slate-50 rounded-xl border border-mono80 overflow-hidden min-h-[24rem]">
      <MapContainer center={[-1.62, 113.23]} zoom={5} className="w-full h-full">
        <TileLayer
          attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          id="mapbox/streets-v11"
          tileSize={512}
          zoomOffset={-1}
        />

        <CurrentUserLocationMarker />

        {dummyPositions.map((pos) => (
          <Marker
            position={pos}
            icon={icon({
              iconUrl: "/image/leaflet/location-pin.png",
              iconSize: [28, 28],
            })}
          >
            <Popup>Attendance pin.</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const CurrentUserLocationMarker: FC<{ center?: boolean }> = ({
  center = false,
}) => {
  const { position } = useGeolocationAPI();
  const map = useMap();

  /**
   * Change map's camera view to current position.
   */
  useEffect(() => {
    if (!position || !center) {
      return;
    }

    map.flyTo([position.coords.latitude, position.coords.longitude], 9);
  }, [position, map, center]);

  if (!position) {
    return null;
  }

  return (
    <Marker position={[position.coords.latitude, position.coords.longitude]}>
      <Popup>Anda berada di sini!</Popup>
    </Marker>
  );
};
