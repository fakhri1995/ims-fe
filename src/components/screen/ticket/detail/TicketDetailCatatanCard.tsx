import { Empty, Input, Spin, notification } from "antd";
import type { AxiosError } from "axios";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { CheckIconSvg } from "components/icon";
import { PlusIconSvg } from "components/icon";
import ModalCore from "components/modal/modalCore";
import { H1, Label, Text } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  TICKET_CLIENT_LOG_GET,
  TICKET_CLIENT_NOTE_ADD,
  TICKET_CLIENT_NOTE_DELETE,
  TICKET_CLIENT_NOTE_UPDATE,
  TICKET_LOG_GET,
  TICKET_NOTE_ADD,
  TICKET_NOTE_DELETE,
  TICKET_NOTE_UPDATE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

import { TicketService, TicketServiceQueryKeys } from "apis/ticket";

import EditIcon from "assets/vectors/icon-edit.svg";
import TrashIcon from "assets/vectors/icon-trash.svg";

/**
 * Component TicketDetailCatatanCard's props.
 */
export interface ITicketDetailCatatanCard {
  ticketId?: number | string;
  fetchAsAdmin?: boolean;
}

/**
 * Component TicketDetailCatatanCard
 */
export const TicketDetailCatatanCard: FC<ITicketDetailCatatanCard> = ({
  ticketId,
  fetchAsAdmin,
}) => {
  const parsedTicketId = parseInt(ticketId as string);
  // if (parsedTicketId == NaN) {
  //   return null;
  // }

  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetTicketLog = hasPermission(
    fetchAsAdmin ? TICKET_LOG_GET : TICKET_CLIENT_LOG_GET
  );
  const isAllowedToDeleteNote = hasPermission(
    fetchAsAdmin ? TICKET_NOTE_DELETE : TICKET_CLIENT_NOTE_DELETE
  );
  const isAllowedToAddNote = hasPermission(
    fetchAsAdmin ? TICKET_NOTE_ADD : TICKET_CLIENT_NOTE_ADD
  );
  const isAllowedToUpdateNote = hasPermission(
    fetchAsAdmin ? TICKET_NOTE_UPDATE : TICKET_CLIENT_NOTE_UPDATE
  );

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [upsertNoteModal, setUpsertNoteModal] = useState({
    visible: false,
    mode: "update" as "update" | "insert",
    currentNotesValue: "",
    logId: -1,
  });
  const [deleteNoteModal, setDeleteNoteModal] = useState({
    visible: false,
    noteLogId: -1,
  });

  const { data, isLoading, isError } = useQuery(
    [TicketServiceQueryKeys.TICKET_LOG_GET, parsedTicketId, fetchAsAdmin],
    () => TicketService.findOneLog(axiosClient, parsedTicketId, fetchAsAdmin),
    {
      enabled: isAllowedToGetTicketLog,
      select: (response) => response.data.data.special_logs,
    }
  );

  const onMutationSucceed = (message: string) => {
    queryClient.invalidateQueries(TicketServiceQueryKeys.TICKET_LOG_GET);

    notification.success({
      message,
    });
  };
  const onMutationError = (error: AxiosError) => {
    notification.error({
      message: error.response.data.message,
    });
  };

  const { mutate: deleteNote, isLoading: deleteNoteLoading } = useMutation(
    (payload: { ticketId: number; log_id: number }) =>
      TicketService.removeNote(axiosClient, payload, fetchAsAdmin),
    {
      onSuccess: (response) => onMutationSucceed(response.data.message),
      onError: onMutationError,
      onSettled: () => {
        resetDeleteNoteModal();
      },
    }
  );

  const { mutate: addNote, isLoading: addNoteLoading } = useMutation(
    (payload: { ticketId: number; notes: string }) =>
      TicketService.addNote(axiosClient, payload, fetchAsAdmin),
    {
      onSuccess: (response) => onMutationSucceed(response.data.message),
      onError: onMutationError,
      onSettled: () => resetUpsertNoteModal(),
    }
  );

  const { mutate: updateNote, isLoading: updateNoteLoading } = useMutation(
    (payload: { ticketId: number; log_id: number; notes: string }) =>
      TicketService.updateNote(
        axiosClient,
        {
          id: payload.ticketId,
          log_id: payload.log_id,
          notes: payload.notes,
        },
        fetchAsAdmin
      ),
    {
      onSuccess: (response) => onMutationSucceed(response.data.message),
      onError: onMutationError,
      onSettled: () => resetUpsertNoteModal(),
    }
  );

  const resetDeleteNoteModal = () => {
    setDeleteNoteModal({
      visible: false,
      noteLogId: -1,
    });
  };

  const resetUpsertNoteModal = () => {
    setUpsertNoteModal({
      visible: false,
      currentNotesValue: "",
      mode: "update",
      logId: -1,
    });
  };

  return (
    <>
      <div className=" shadow-md rounded-md bg-white p-5 my-2 lg:ml-2">
        <div className=" flex items-center justify-between mb-5">
          <H1>Catatan</H1>
          <div
            className=" h-full flex justify-end items-start cursor-pointer"
            onClick={() => {
              if (isError) {
                /** Do nothing when there is an error when initialize data fetching */
                return;
              }

              if (!isAllowedToAddNote) {
                permissionWarningNotification("Menambahkan", "Catatan Tiket");
                return;
              }

              setUpsertNoteModal({
                visible: true,
                mode: "insert",
                currentNotesValue: "",
                logId: -1,
              });
            }}
          >
            <PlusIconSvg size={25} color={`#35763B`} />
          </div>
        </div>

        {/* Error safe guard */}
        {!isError && (
          <>
            {isLoading && <Spin />}

            {!isLoading && (data === undefined || data.length === 0) && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}

            {!isLoading &&
              data &&
              data.map((note, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col">
                    <p className=" mb-3 line-clamp-6 text-mono30">
                      {note.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className=" w-5 h-5 rounded-full mr-2">
                          <img
                            src={generateStaticAssetUrl(
                              note.causer.profile_image.link
                            )}
                            className="object-contain w-5 h-5 rounded-full overflow-hidden"
                            alt=""
                          />
                        </div>
                        <Text color={`green`}>{note.causer.name}</Text>
                      </div>
                      <div>
                        <Label>
                          {moment(note.created_at)
                            .locale("id")
                            .format("LL, LT")}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Delete & Edit button */}
                  <div className="flex items-center justify-end space-x-2 mt-3">
                    <button
                      className="p-2 flex items-center justify-center bg-white"
                      onClick={() => {
                        if (!isAllowedToDeleteNote) {
                          permissionWarningNotification(
                            "Menghapus",
                            "Catatan Tiket"
                          );
                          return;
                        }

                        setDeleteNoteModal({
                          visible: true,
                          noteLogId: note.id,
                        });
                      }}
                    >
                      <TrashIcon className="text-state1 w-4 h-4" />
                    </button>

                    <button
                      className="p-2 flex items-center justify-center bg-white"
                      onClick={() => {
                        if (!isAllowedToUpdateNote) {
                          permissionWarningNotification(
                            "Memperbarui",
                            "Catatan Tiket"
                          );
                          return;
                        }

                        setUpsertNoteModal({
                          visible: true,
                          currentNotesValue: note.description,
                          logId: note.id,
                          mode: "update",
                        });
                      }}
                    >
                      <EditIcon className="w-3 h-3" />
                    </button>
                  </div>
                </React.Fragment>
              ))}
          </>
        )}
      </div>

      {!isError && (
        <>
          {isAllowedToDeleteNote && (
            <DeleteCatatanModal
              visible={deleteNoteModal.visible}
              isLoading={deleteNoteLoading}
              onCancel={resetDeleteNoteModal}
              onOk={() => {
                deleteNote({
                  ticketId: parsedTicketId,
                  log_id: deleteNoteModal.noteLogId,
                });
              }}
            />
          )}

          {(isAllowedToAddNote || isAllowedToUpdateNote) && (
            <UpsertCatatanModal
              visible={upsertNoteModal.visible}
              mode={upsertNoteModal.mode}
              currentNotesValue={upsertNoteModal.currentNotesValue}
              isLoading={updateNoteLoading || addNoteLoading}
              onCancel={resetUpsertNoteModal}
              onOk={(newNote) => {
                if (upsertNoteModal.mode === "insert") {
                  addNote({
                    ticketId: parsedTicketId,
                    notes: newNote,
                  });
                } else {
                  updateNote({
                    ticketId: parsedTicketId,
                    log_id: upsertNoteModal.logId,
                    notes: newNote,
                  });
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
};

interface IBaseModalProps {
  visible: boolean;
  onCancel: () => void;

  isLoading: boolean;
  onOk: () => void;
}
const DeleteCatatanModal: FC<IBaseModalProps> = ({
  visible,
  onCancel,
  onOk,
  isLoading,
}) => {
  return (
    <ModalCore
      title="Penghapusan Catatan"
      visible={visible}
      loading={isLoading}
      onCancel={onCancel}
      footer={
        <Spin spinning={isLoading}>
          <div className="flex justify-between items-center">
            <ButtonSys type="default" onClick={onCancel}>
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={onOk}>
              Ya, saya yakin dan hapus catatan
            </ButtonSys>
          </div>
        </Spin>
      }
    >
      <p>Apakah Anda yakin ingin menghapus catatan ini?</p>
    </ModalCore>
  );
};

interface IUpsertCatatanModal extends Omit<IBaseModalProps, "onOk"> {
  mode: "update" | "insert";
  currentNotesValue?: string;

  onOk: (newNotes: string) => void;
}
const UpsertCatatanModal: FC<IUpsertCatatanModal> = ({
  mode,
  currentNotesValue,
  visible,
  onOk,
  onCancel,
  isLoading,
}) => {
  const modalTitle = useMemo(
    () => (mode === "update" ? "Ubah" : "Buat") + " Catatan",
    [mode]
  );

  const [newNotesValue, setNewNotesValue] = useState("");
  useEffect(() => {
    setNewNotesValue(currentNotesValue);
  }, [currentNotesValue]);

  return (
    <ModalCore
      title={modalTitle}
      visible={visible}
      onCancel={() => {
        setNewNotesValue("");
        onCancel();
      }}
      loading={isLoading}
      footer={
        <Spin spinning={isLoading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                setNewNotesValue("");
                onCancel();
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys
              type="primary"
              onClick={() => {
                setNewNotesValue("");
                onOk(newNotesValue);
              }}
            >
              <CheckIconSvg size={15} color={`#ffffff`} />
              Simpan Catatan
            </ButtonSys>
          </div>
        </Spin>
      }
    >
      <section>
        <label
          htmlFor="note-input-box"
          className="mig-caption text-gray-400 mb-1 block"
        >
          Catatan
        </label>
        <Input.TextArea
          id="note-input-box"
          value={newNotesValue}
          onChange={(ev) => setNewNotesValue(ev.target.value)}
        />
      </section>
    </ModalCore>
  );
};
