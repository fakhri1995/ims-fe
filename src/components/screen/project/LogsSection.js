import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse, Input, Table, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { PROJECT_LOGS_GET } from "lib/features";

import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../lib/helper";
import ModalProjectLog from "../../modal/projects/modalProjectLog";

const LogsSection = ({
  initProps,
  projectId,
  projectName,
  refresh,
  refreshTasks,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetLogs = hasPermission(PROJECT_LOGS_GET);

  // 2. useState
  const [dataRawProjectLogs, setDataRawProjectLogs] = useState({});
  const [dataProjectLogs, setDataProjectLogs] = useState([]);
  const [loadingProjectLog, setLoadingProjectLog] = useState(false);
  const [dataCurrentLog, setDataCurrentLog] = useState({});
  const [modalDetailLog, setModalDetailLog] = useState(false);

  // pagination & filter
  const [searchingFilterLogs, setSearchingFilterLogs] = useState("");
  const [pageProjectLogs, setPageProjectLogs] = useState(1);

  // 3. useEffect
  // 3.1. Get Project Logs
  useEffect(() => {
    if (!isAllowedToGetLogs) {
      permissionWarningNotification("Mendapatkan", "Log Aktivitas Proyek");
      setLoadingProjectLog(false);
      return;
    }

    const fetchData = async () => {
      setLoadingProjectLog(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogs?project_id=${projectId}&keyword=${searchingFilterLogs}&page=${pageProjectLogs}&rows=5`,
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
            setDataRawProjectLogs(res2.data);
            setDataProjectLogs(res2.data.data);
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
          setLoadingProjectLog(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    isAllowedToGetLogs,
    refresh,
    refreshTasks,
    searchingFilterLogs,
    pageProjectLogs,
  ]);

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
              <p>Log Aktivitas Proyek {projectName}</p>
            </div>
          }
        >
          <div className="grid gap-2 lg:gap-6">
            {/* Search by keyword (kata kunci) */}
            <div className="">
              <Input
                defaultValue={searchingFilterLogs}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  if (!e.target.value) {
                    setSearchingFilterLogs("");
                  }
                  setSearchingFilterLogs(e.target.value);
                }}
                disabled={!isAllowedToGetLogs}
              />
            </div>

            <Table
              rowKey={(record) => record.id}
              showHeader={false}
              dataSource={dataProjectLogs}
              loading={loadingProjectLog}
              pagination={{
                current: pageProjectLogs,
                pageSize: 5,
                total: dataRawProjectLogs?.total,
              }}
              onChange={(pagination) => {
                setPageProjectLogs(pagination.current);
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setDataCurrentLog(record);
                    setModalDetailLog(true);
                  },
                };
              }}
              columns={[
                {
                  title: "Logs",
                  dataIndex: "id",
                  key: "id",
                  render: (_, log) => {
                    return (
                      <div
                        key={log?.id}
                        className="grid grid-cols-1 cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={generateStaticAssetUrl(
                                log?.causer?.profile_image?.link ??
                                  "staging/Users/default_user.png"
                              )}
                              alt={"profile image"}
                              className="w-8 h-8 bg-cover object-cover rounded-full"
                            />
                            <p className="truncate">
                              <strong>{log?.causer?.name}</strong> -{" "}
                              {log?.causer?.roles?.[0]?.name}
                            </p>
                          </div>
                          <p className="text-right">
                            {momentFormatDate(
                              log?.created_at,
                              "-",
                              "D MMM YYYY, HH:mm",
                              true
                            )}
                          </p>
                        </div>
                        <p>
                          {log?.description?.length > 140
                            ? log?.description?.slice(0, 140) + "..."
                            : log?.description}
                        </p>
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        </Collapse.Panel>
      </Collapse>

      {/* Modal Notes */}
      <AccessControl hasPermission={PROJECT_LOGS_GET}>
        <ModalProjectLog
          visible={modalDetailLog}
          onvisible={setModalDetailLog}
          dataLog={dataCurrentLog}
        />
      </AccessControl>
    </section>
  );
};

export default LogsSection;
