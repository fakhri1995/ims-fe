import { useEffect, useState } from "react";

/**
 * Custom hook untuk akses GeolocationAPI (browser internal API).
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
export const useGeolocationAPI = (options?: PositionOptions) => {
  const [invokeCount, setInvokeCount] = useState(0);

  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
  );
  const [error, setError] = useState<GeolocationPositionError | undefined>(
    undefined
  );
  const [isPermissionBlocked, setIsPermissionBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!cancelled) {
          setPosition(position);
        }
      },
      (error) => {
        if (!cancelled) {
          setError(error);
        }
      },
      options
    );

    return () => {
      cancelled = true;
    };
  }, [options]);

  useEffect(() => {
    if (invokeCount === 0) {
      setInvokeCount((prev) => ++prev);
      return;
    }

    if (!position && error.code === 1) {
      setIsPermissionBlocked(true);
    }
  }, [position, error]);

  return { position, error, isPermissionBlocked };
};
