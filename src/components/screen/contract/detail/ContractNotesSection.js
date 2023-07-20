import { Input, Table, notification } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { PlusIconSvg } from "components/icon";
import ModalCore from "components/modal/modalCore";

import { useAccessControl } from "contexts/access-control";

import {
  CONTRACT_NOTES_GET,
  CONTRACT_NOTE_ADD,
  CONTRACT_NOTE_DELETE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "lib/helper";

import { ContractService } from "apis/contract";

import ModalContractNote from "../../../modal/contracts/modalContractNote";

const ContractNotesSection = ({ initProps, contractId }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetNotes = hasPermission(CONTRACT_NOTES_GET);
  const isAllowedToAddNote = hasPermission(CONTRACT_NOTE_ADD);
  const isAllowedToDeleteNote = hasPermission(CONTRACT_NOTE_DELETE);

  // 2. useState
  const [refreshNotes, setRefreshNotes] = useState(-1);

  const [pageNotes, setPageNotes] = useState(1);

  const [dataInputNote, setDataInputNote] = useState("");
  const [dataCurrentNote, setDataCurrentNote] = useState("");

  const [modalDetailNote, setModalDetailNote] = useState(false);
  const [modalAddNote, setModalAddNote] = useState(false);
  const [loadingAddNote, setLoadingAddNote] = useState(false);

  // 3. useQuery & useEffect
  // 3.1. Get Contract Notes
  const { data: dataContractNotes, isLoading: loadingContractNotes } = useQuery(
    [CONTRACT_NOTES_GET, refreshNotes, pageNotes],
    () =>
      ContractService.getNotes(
        initProps,
        isAllowedToGetNotes,
        contractId,
        pageNotes
      ),
    {
      enabled: isAllowedToGetNotes,
      select: (response) => response.data,
    }
  );

  // 4. Event
  const handleAddNote = () => {
    if (!isAllowedToAddNote) {
      permissionWarningNotification("Menambah", "Catatan Kontrak");
      return;
    }

    const payload = { contract_id: contractId, notes: dataInputNote };
    setLoadingAddNote(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContractLogNotes`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          notification.success({
            message: response.message,
            duration: 3,
          });
          setDataInputNote("");
          setRefreshNotes((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah catatan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingAddNote(false);
        setModalAddNote(false);
      });
  };

  return (
    <section>
      <div className="grid">
        <div className="flex justify-between ">
          <h4 className="mig-heading--4 ">Catatan</h4>
          <button
            className="bg-transparent hover:bg-gray-100 rounded-md"
            onClick={() => setModalAddNote(true)}
          >
            <PlusIconSvg size={24} color="#35763B" />
          </button>
        </div>

        <Table
          rowKey={(record) => record.id}
          showHeader={false}
          dataSource={dataContractNotes?.data}
          loading={loadingContractNotes}
          className="tableNotes"
          pagination={{
            current: pageNotes,
            pageSize: 5,
            total: dataContractNotes?.total,
          }}
          onChange={(pagination) => {
            setPageNotes(pagination.current);
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setDataCurrentNote(record);
                setModalDetailNote(true);
              },
            };
          }}
          columns={[
            {
              title: "Notes",
              dataIndex: "id",
              key: "id",

              render: (_, note) => {
                return (
                  <div
                    key={note?.id}
                    className="cursor-pointer grid grid-cols-1"
                  >
                    <p className="text-md mb-2">
                      {note?.notes?.length > 280
                        ? note?.notes.slice(0, 280) + "..."
                        : note?.notes ?? "-"}
                    </p>
                    <div className="flex  items-center justify-between">
                      <div className="flex flex-row text-wrap w-30">
                        <img
                          src={generateStaticAssetUrl(
                            note?.causer?.profile_image?.link ??
                              "staging/Users/default_user.png"
                          )}
                          alt={"profile image"}
                          className="rounded-full w-5 h-5 mr-2 bg-cover object-cover "
                        />
                        <p className="mig-caption--medium text-primary100 ">
                          {note?.causer?.name} - {note.causer?.roles[0].name}
                        </p>
                      </div>
                      <p className="text-sm text-mono80 text-right">
                        {momentFormatDate(
                          note?.created_at,
                          "-",
                          "D MMM YYYY, HH:mm",
                          true
                        )}
                      </p>
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
      </div>

      {/* Modal Detail Notes */}
      <AccessControl hasPermission={CONTRACT_NOTES_GET}>
        <ModalContractNote
          initProps={initProps}
          visible={modalDetailNote}
          onvisible={setModalDetailNote}
          dataNote={dataCurrentNote}
          isAllowedToDeleteNote={isAllowedToDeleteNote}
          setRefreshNotes={setRefreshNotes}
        />
      </AccessControl>

      {/* Modal Add Notes */}
      <AccessControl hasPermission={CONTRACT_NOTE_ADD}>
        <ModalCore
          title={`Tambah Catatan`}
          visible={modalAddNote}
          onCancel={() => {
            setModalAddNote(false);
            setDataInputNote("");
          }}
          footer={
            <div className="flex justify-end">
              <ButtonSys
                type={"primary"}
                onClick={handleAddNote}
                disabled={
                  !isAllowedToAddNote || !dataInputNote.length || loadingAddNote
                }
              >
                Tambah
              </ButtonSys>
            </div>
          }
          loading={loadingAddNote}
        >
          <Input.TextArea
            placeholder="Masukkan catatan..."
            rows={3}
            value={dataInputNote}
            onChange={(event) => {
              setDataInputNote(event.target.value);
            }}
          />
        </ModalCore>
      </AccessControl>
    </section>
  );
};

export default ContractNotesSection;
