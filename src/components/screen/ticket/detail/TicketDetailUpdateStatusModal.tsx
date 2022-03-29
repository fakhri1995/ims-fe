import { Input, Spin, notification } from "antd";
import type { AxiosError } from "axios";
import { FC, useMemo, useState } from "react";
import { useMutation } from "react-query";

import ButtonSys from "components/button";
import ModalCore from "components/modal/modalCore";

import { useAxiosClient } from "hooks/use-axios-client";

import { TicketService, TicketUpdateStatusPayload } from "apis/ticket";

export interface ITicketDetailUpdateStatusModal {
  visible: boolean;
  onChangeVisible: (visibility: boolean) => void;
  onMutateSucceed: () => void;

  ticketDisplayName: string;
  ticketId: number;

  status: "open" | "on-hold" | "on-progress" | "canceled" | "closed";
}

export const TicketDetailUpdateStatusModal: FC<
  ITicketDetailUpdateStatusModal
> = ({
  visible,
  onChangeVisible,
  onMutateSucceed,
  status,
  ticketDisplayName,
  ticketId,
}) => {
  const axiosClient = useAxiosClient();

  const [payloadNoteRaw, setPayloadNoteRaw] = useState("");

  /** @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/229867523/Update+Status+Ticket */
  const payloadStatusNumbered = useMemo(() => {
    switch (status) {
      case "open":
        return 2;
      case "on-progress":
        return 3;
      case "on-hold":
        return 4;
      case "closed":
        return 6;
      case "canceled":
        return 7;
    }
  }, [status]);

  const { mutate: updateTicketStatus, isLoading } = useMutation(
    (payload: TicketUpdateStatusPayload) =>
      TicketService.updateStatus(axiosClient, payload),
    {
      onSuccess: (response) => {
        notification.success({
          message: response.data.message,
        });

        onMutateSucceed();
      },
      onError: (error: AxiosError) => {
        notification.error({
          message: error.response.data.message,
        });
      },
      onSettled: () => {
        onChangeVisible(false);
      },
    }
  );

  return (
    <ModalCore
      title="Pembaruan status tiket"
      visible={visible}
      loading={isLoading}
      onCancel={() => {
        onChangeVisible(false);
      }}
      footer={
        <Spin spinning={isLoading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                onChangeVisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys
              type="primary"
              color={`danger`}
              onClick={() => {
                updateTicketStatus({
                  id: ticketId,
                  notes: payloadNoteRaw,
                  status: payloadStatusNumbered,
                });
              }}
            >
              Ya, saya yakin dan perbarui status tiket
            </ButtonSys>
          </div>
        </Spin>
      }
    >
      <div className="flex flex-col space-y-6">
        <p>
          Apakah Anda yakin ingin mengubah status tiket{" "}
          <strong>{ticketDisplayName}</strong> menjadi{" "}
          <strong className="uppercase">{status}</strong>?
        </p>

        <section>
          <label
            htmlFor="update-status-note"
            className="mig-caption text-gray-400 mb-1 block"
          >
            Catatan
          </label>
          <Input.TextArea
            id="update-status-note"
            value={payloadNoteRaw}
            onChange={(ev) => setPayloadNoteRaw(ev.target.value)}
          />
        </section>
      </div>
    </ModalCore>
  );
};
