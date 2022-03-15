import { AxiosInstance } from "axios";
import QueryString from "qs";

import { IReverseSucceedResponse } from "./nominatim.types";

export class NominatimService {
  /**
   * Reverse geocoding to external API by Nominatim (OpenStreetMap).
   *
   * Example endpoint URL https://nominatim.openstreetmap.org/reverse?lat=-0.97&lon=100.7&format=json
   *
   * @access GET https://nominatim.openstreetmap.org/reverse
   */
  static async reverse(
    axiosClient: AxiosInstance,
    payload: { lat: number; lon: number }
  ) {
    const qs = QueryString.stringify(
      {
        lat: payload.lat,
        lon: payload.lon,
        format: "json",
      },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IReverseSucceedResponse>(
      "https://nominatim.openstreetmap.org/reverse" + qs
    );
  }
}
