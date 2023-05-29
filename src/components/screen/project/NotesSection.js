import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse, Input, Table, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { AccessControl } from "components/features/AccessControl";

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
} from "../../../lib/helper";
import ButtonSys from "../../button";
import ModalProjectNote from "../../modal/projects/modalProjectNote";

const NotesSection = ({ initProps, projectId, projectName }) => {
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

  // 3. useEffect
  // 3.1. Get Project Notes
  useEffect(() => {
    if (!isAllowedToGetNotes) {
      permissionWarningNotification("Mendapatkan", "Catatan Proyek");
      setLoadingProjectNotes(false);
      return;
    }

    setLoadingProjectNotes(true);
    const fetchData = async () => {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogNotes?project_id=${projectId}&keyword=${searchingFilterNotes}&page=${pageProjectNotes}&rows=5`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectLogNotes?project_id=${projectId}`,
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
      <Collapse
        className="shadow-md rounded-md bg-white"
        bordered={false}
        ghost={true}
        defaultActiveKey={1}
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
      >
        <Collapse.Panel
          key={1}
          header={
            <div className="mig-heading--4 flex space-x-2 items-center">
              <p>Catatan Proyek {projectName}</p>
            </div>
          }
        >
          <div className="grid gap-2 lg:gap-6">
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
              pagination={{
                current: pageProjectNotes,
                pageSize: 5,
                total: dataRawProjectNotes?.total,
              }}
              onChange={(pagination) => {
                setPageProjectNotes(pagination.current);
              }}
              columns={[
                {
                  title: "Notes",
                  dataIndex: "id",
                  key: "id",

                  render: (_, note) => {
                    return (
                      <div key={note?.id} className="cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={generateStaticAssetUrl(
                                note?.causer?.profile_image?.link ??
                                  "staging/Users/default_user.png"
                              )}
                              alt={"profile image"}
                              className="w-8 h-8 bg-cover object-cover rounded-full"
                            />
                            <p className="truncate">
                              <strong>{note?.causer?.name}</strong> -{" "}
                              {note?.causer?.roles?.[0]?.name}
                            </p>
                          </div>
                          <p className="text-right">
                            {momentFormatDate(
                              note?.created_at,
                              "-",
                              "D MMM YYYY, HH:mm",
                              true
                            )}
                          </p>
                        </div>
                        <p className="">
                          {note?.notes?.length > 280
                            ? note?.notes.slice(0, 280) + "..."
                            : note?.notes ?? "-"}
                        </p>
                      </div>
                    );
                  },
                },
              ]}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setDataCurrentNote(record);
                    setModalDetailNote(true);
                  },
                };
              }}
            />

            {isNoteInput ? (
              <div className="space-y-2">
                <TextareaAutosize
                  value={dataInputNote}
                  onChange={(e) => setDataInputNote(e.target.value)}
                  minRows={3}
                  style={{
                    width: "100%",
                    border: "1px solid #b8b8b8",
                    borderRadius: "5px",
                    padding: "6.5px 11px",
                  }}
                />
                <div className="text-right">
                  <button
                    onClick={() => {
                      setIsNoteInput(false);
                      setDataInputNote("");
                    }}
                    className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
                  >
                    Batal
                  </button>
                  <ButtonSys
                    type={"primary"}
                    onClick={() => handleAddNote(dataInputNote)}
                    disabled={!isAllowedToAddNote}
                  >
                    Simpan
                  </ButtonSys>
                </div>
              </div>
            ) : (
              <ButtonSys
                type={"default"}
                size={"large"}
                fullWidth={true}
                onClick={() => setIsNoteInput(true)}
              >
                <div className="flex space-x-2 items-center ">
                  <PlusOutlined />
                  <p className="mig-caption--bold ">Tambah Catatan</p>
                </div>
              </ButtonSys>
            )}
          </div>
        </Collapse.Panel>
      </Collapse>

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
    </section>
  );
};

export default NotesSection;
