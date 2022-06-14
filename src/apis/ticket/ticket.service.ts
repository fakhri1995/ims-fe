import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { formatDatePayload, objectToFormData } from "lib/helper";

import type {
  AddticketPayload,
  DeleteFileTicketPayload,
  IGetTicketLogSucceedResponse,
  IGetTicketSucceedResponse,
  TicketUpdateStatusPayload,
  UpdateTicketPayload,
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
   * Retrive specific ticket's log.
   * Digunakan untuk menampilkan data Catatan Ticket dan Aktivitas Ticket
   *  (pada halaman detail ticket).
   *
   * @access /getClientTicketLog?id={{id}}
   * @access /getTicketLog?id={{id}}
   * @see {TicketServiceQueryKeys.TICKET_LOG_GET}
   */
  static async findOneLog(
    axiosClient: AxiosInstance,
    ticketId: number,
    withAdminEndpoint: boolean = false
  ) {
    const qs = QueryString.stringify(
      { id: ticketId },
      { addQueryPrefix: true }
    );

    const endpoint = withAdminEndpoint
      ? "/getTicketLog"
      : "/getClientTicketLog";

    return await axiosClient.get<IGetTicketLogSucceedResponse>(endpoint + qs);
  }

  /**
   * Create new ticket.
   *
   * @access POST /addTicket
   */
  static async create(axiosClient: AxiosInstance, payload: AddticketPayload) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post("/addTicket", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Update existing ticket (primarily from UpdateTicket drawer component).
   *
   * @access /updateTicket
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: UpdateTicketPayload
  ) {
    let payloadFormData: FormData = null;

    try {
      const enhancedPayload = {
        ...payload,
        raised_at: formatDatePayload(payload.raised_at),
        closed_at: formatDatePayload(payload.closed_at),
        incident_time: formatDatePayload(payload.incident_time),
      };

      // Kalau null lebih baik tidak perlu diattach ke payload
      // Otherwise backend akan tolak karena kena validator.
      if (enhancedPayload.closed_at === null) {
        delete enhancedPayload["closed_at"];
      }

      payloadFormData = objectToFormData(enhancedPayload);
    } catch (e) {
      console.error("e", e);
    }

    return await axiosClient.post("/updateTicket", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Delete an attachment from specific ticket.
   *
   * @access DELETE /deleteFileTicket
   */
  static async deleteFileTicket(
    axiosClient: AxiosInstance,
    payload: DeleteFileTicketPayload
  ) {
    return await axiosClient.delete("/deleteFileTicket", { data: payload });
  }

  /**
   * Update status sebuah ticket.
   *
   * @access PUT /updateStatusTicket
   */
  static async updateStatus(
    axiosClient: AxiosInstance,
    payload: TicketUpdateStatusPayload
  ) {
    return await axiosClient.put<HttpRequestBaseSucceedResponse>(
      "/updateStatusTicket",
      payload
    );
  }

  /**
   * Add a new note (catatan) for specific ticket.
   *
   * @access POST /addNoteTicket
   * @access POST /clientAddNoteTicket
   */
  static async addNote(
    axiosClient: AxiosInstance,
    payload: { ticketId: number; notes: string },
    withAdminEndpoint: boolean = false
  ) {
    const endpoint = withAdminEndpoint
      ? "/addNoteTicket"
      : "/clientAddNoteTicket";

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(endpoint, {
      id: payload.ticketId,
      notes: payload.notes,
    });
  }

  /**
   * Update salah satu note (catatan) pada detail ticket.
   *
   * @access PUT /updateNoteTicket
   * @access PUT /clientUpdateNoteTicket
   */
  static async updateNote(
    axiosClient: AxiosInstance,
    payload: { id: number; log_id: number; notes: string },
    withAdminEndpoint: boolean = false
  ) {
    const endpoint = withAdminEndpoint
      ? "/updateNoteTicket"
      : "/clientUpdateNoteTicket";

    return await axiosClient.put<HttpRequestBaseSucceedResponse>(
      endpoint,
      payload
    );
  }

  /**
   * Delete a note (catatan) from specific ticket.
   *
   * @access DELETE /deleteNoteTicket
   * @access DELETE /clientDeleteNoteTicket
   */
  static async removeNote(
    axiosClient: AxiosInstance,
    payload: { ticketId: number; log_id: number },
    fetchAsAdmin: boolean = false
  ) {
    const endpoint = fetchAsAdmin
      ? "/deleteNoteTicket"
      : "/clientDeleteNoteTicket";

    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(endpoint, {
      data: {
        id: payload.ticketId,
        log_id: payload.log_id,
      },
    });
  }
}
