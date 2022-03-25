/**
 * Note this is not a full signature of the response. But it's sufficient for our needs.
 * We only need `display_name`.
 *
 * @access GET https://nominatim.openstreetmap.org/reverse?lat=[:LAT]&lon=[:LON]format=json
 */
export interface IReverseSucceedResponse {
  place_id: number;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
}
