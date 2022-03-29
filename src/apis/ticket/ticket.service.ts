import type { AxiosInstance } from "axios";
import QueryString from "qs";

import type {
  IGetTicketSucceedResponse,
  TicketUpdateStatusPayload,
} from "./ticket.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class TicketService {
  /**
   * @access GET /getTicket?id={{ticketId}}
   * @see {TicketServiceQueryKeys.TICKET_GET}
   */
  static async findOne(axiosClient: AxiosInstance, ticketId: number) {
    const qs = QueryString.stringify(
      { id: ticketId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetTicketSucceedResponse>("/getTicket" + qs);
  }

  /**
   * @access PUT /updateStatusTicket
   */
  static async updateStatus(
    axiosClient: AxiosInstance,
    status: TicketUpdateStatusPayload
  ) {
    return await axiosClient.put<HttpRequestBaseSucceedResponse>(
      "/updateStatusTicket",
      status
    );
  }
}
