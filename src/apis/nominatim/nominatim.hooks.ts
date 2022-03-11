import axios from "axios";
import { useQuery } from "react-query";

import { NominatimService } from "./nominatim.service";

/**
 * Custom hook untuk transform Device Location (latitude,longitude) menjadi nama lokasi
 *  menggunakan Nominatim OSM Reverse Geocode API.
 */
export const useNominatimReverseGeocode = (position?: GeolocationPosition) => {
  const axiosClient = axios.create({
    headers: {
      Accept: "application/json",
    },
  });

  /**
   * TBD: perlu di polling tidak untuk get latest location?
   */
  return useQuery(
    ["NOMATIM_REVERSE_GEOCODE", position],
    (variables) => {
      const mPosition: GeolocationPosition | undefined = variables
        .queryKey[1] as GeolocationPosition;

      const { latitude, longitude } = mPosition.coords;

      return NominatimService.reverse(axiosClient, {
        lat: latitude,
        lon: longitude,
      });
    },
    {
      enabled: !!position,
      retryDelay: 2000,
      select: (response) => response.data.display_name,
    }
  );
};
