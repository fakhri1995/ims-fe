import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse, Input, Spin, Table, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { PlusIconSvg } from "components/icon";
import ModalCore from "components/modal/modalCore";
import ModalProjectNote from "components/modal/projects/modalProjectNote";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECT_NOTES_GET,
  PROJECT_NOTE_ADD,
  PROJECT_NOTE_DELETE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "lib/helper";

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
  const isAllowedToGetNotes = hasPermission(PROJECT_NOTES_GET);
  const isAllowedToAddNote = hasPermission(PROJECT_NOTE_ADD);
  const isAllowedToDeleteNote = hasPermission(PROJECT_NOTE_DELETE);

  // 2. useState
  const [refreshNotes, setRefreshNotes] = useState(-1);

  const [dataRawProjectNotes, setDataRawProjectNotes] = useState({});
  const [dataProjectNotes, setDataProjectNotes] = useState([]);
  const [loadingProjectNotes, setLoadingProjectNotes] = useState(false);

  const [searchingFilterNotes, setSearchingFilterNotes] = useState("");
  const [pageProjectNotes, setPageProjectNotes] = useState(1);

  const [isNoteInput, setIsNoteInput] = useState(false);
  const [dataInputNote, setDataInputNote] = useState("");
  const [dataCurrentNote, setDataCurrentNote] = useState("");

  const [modalDetailNote, setModalDetailNote] = useState(false);
  const [modalAddNote, setModalAddNote] = useState(false);
  const [loadingAddNote, setLoadingAddNote] = useState(false);

  // 3. useEffect
  // 3.1. Get Project Notes
  useEffect(() => {
    if (!isAllowedToGetNotes) {
      permissionWarningNotification("Mendapatkan", "Catatan Proyek");
      setLoadingProjectNotes(false);
      return;
    }

    const fetchData = async () => {
      setLoadingProjectNotes(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogNotes?project_id=${contractId}&keyword=${searchingFilterNotes}&page=${pageProjectNotes}&rows=5`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataRawProjectNotes(res2.data);
            setDataProjectNotes(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingProjectNotes(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    isAllowedToGetNotes,
    refreshNotes,
    searchingFilterNotes,
    pageProjectNotes,
  ]);

  // 4. Event
  const handleAddNote = (notes) => {
    if (!isAllowedToAddNote) {
      permissionWarningNotification("Menambah", "Catatan");
      return;
    }

    const payload = { notes: notes };
    setLoadingProjectNotes(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectLogNotes?project_id=${contractId}`,
      {
        method: `POST`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
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
      .finally(() => setLoadingProjectNotes(false));
  };

  return (
    <section>
      <div className="grid">
        <div className="flex justify-between mb-6">
          <h4 className="mig-heading--4 ">Catatan</h4>
          <button
            className="bg-transparent hover:bg-gray-100 rounded-md"
            onClick={() => setModalAddNote(true)}
          >
            <PlusIconSvg size={24} color="#35763B" />
          </button>
        </div>

        {/* Search by keyword (kata kunci) */}
        <Input
          defaultValue={searchingFilterNotes}
          style={{ width: `100%` }}
          placeholder="Kata Kunci.."
          allowClear
          onChange={(e) => {
            if (!e.target.value) {
              setSearchingFilterNotes("");
            }
            setSearchingFilterNotes(e.target.value);
          }}
          disabled={!isAllowedToGetNotes}
        />

        <Table
          rowKey={(record) => record.id}
          showHeader={false}
          dataSource={dataProjectNotes}
          loading={loadingProjectNotes}
          className="tableNotes"
          pagination={{
            current: pageProjectNotes,
            pageSize: 5,
            total: dataRawProjectNotes?.total,
          }}
          onChange={(pagination) => {
            setPageProjectNotes(pagination.current);
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

      {/* Modal Notes */}
      <AccessControl hasPermission={PROJECT_NOTES_GET}>
        <ModalProjectNote
          initProps={initProps}
          visible={modalDetailNote}
          onvisible={setModalDetailNote}
          dataNote={dataCurrentNote}
          isAllowedToDeleteNote={isAllowedToDeleteNote}
          setRefreshNotes={setRefreshNotes}
        />
      </AccessControl>

      {/* Modal Add Notes */}
      <AccessControl hasPermission={PROJECT_NOTE_ADD}>
        <ModalCore
          title={`Tambah Catatan`}
          visible={modalAddNote}
          onCancel={() => {
            setModalAddNote(false);
            setDataInputNote("");
          }}
          footer={
            <Spin spinning={loadingAddNote}>
              <div className="flex justify-end">
                <ButtonSys
                  type={"primary"}
                  onClick={handleAddNote}
                  disabled={!isAllowedToAddNote || !dataInputNote.length}
                >
                  Tambah
                </ButtonSys>
              </div>
            </Spin>
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
