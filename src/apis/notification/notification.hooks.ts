import type { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  NotificationService,
  NotificationServiceQueryKeys,
} from "./notification.service";
import type { GetLastTenNotificationSucceedResponse } from "./notification.types";

// Types
type GetRecentNotificationsParam<T> = {
  // Polling interval in seconds
  refetchInvervalSeconds?: number;

  // Use cache before re-fetcing the data delay time in seconds
  staleTimeSeconds?: number;

  // Data selector
  select?: (
    response: AxiosResponse<GetLastTenNotificationSucceedResponse, any>
  ) => T;
};

type GetRecentNotificationsResponse = AxiosResponse<
  GetLastTenNotificationSucceedResponse,
  any
>;

// Hooks
/**
 * Retrieve up to recent-most 10 notifications.
 *
 * @access — GET /getNotification
 */
export const useGetRecentNotifications = <
  T extends any = GetRecentNotificationsResponse
>(
  options?: GetRecentNotificationsParam<T>
) => {
  const { refetchInvervalSeconds, staleTimeSeconds, select } = options;

  const POLL_INTERVAL_SECONDS = 300; // 5 minutes
  const STALE_TIME_SECONDS = 30; // 30 seconds

  const axiosClient = useAxiosClient();

  return useQuery(
    NotificationServiceQueryKeys.getLastTen,
    () => NotificationService.getLastTen(axiosClient),
    {
      select,
      refetchInterval: (refetchInvervalSeconds || POLL_INTERVAL_SECONDS) * 1000,
      staleTime: (staleTimeSeconds || STALE_TIME_SECONDS) * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
};
