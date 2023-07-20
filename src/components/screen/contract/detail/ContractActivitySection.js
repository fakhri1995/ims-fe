import { Spin, Timeline, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_LOGS_GET } from "lib/features";
import { momentFormatDate, permissionWarningNotification } from "lib/helper";

const ContractActivitySection = ({ initProps, contractId }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetLogs = hasPermission(CONTRACT_LOGS_GET);

  // 2. useState
  const [dataRawLogs, setDataRawLogs] = useState({});
  const [dataLogs, setDataLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [pageLogs, setPageLogs] = useState(1);

  // 3. useEffect
  // 3.1. Get Contract Activity Logs
  useEffect(() => {
    if (!isAllowedToGetLogs) {
      permissionWarningNotification("Mendapatkan", "Log Aktivitas Kontrak");
      setLoadingLogs(false);
      return;
    }

    const fetchData = async () => {
      setLoadingLogs(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContractLogs?contract_id=${contractId}&page=${pageLogs}&rows=7`,
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
            setDataRawLogs(res2.data);
            setDataLogs(res2.data.data);
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
          setLoadingLogs(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [isAllowedToGetLogs]);

  // console.log({ dataLogs });

  return (
    <section>
      <h4 className="mig-heading--4 mb-6">Aktivitas</h4>
      <Spin spinning={loadingLogs}>
        <Timeline>
          {dataLogs?.map((log) => (
            <Timeline.Item key={log?.id} color="#35763B">
              <p className="text-mono50">
                {log?.description?.replace(/\.$/, "")} oleh {log?.causer?.name}
              </p>
              <p className="mig-caption text-mono80">
                {momentFormatDate(
                  log?.created_at,
                  "-",
                  "dddd, DD MMMM YYYY HH:mm"
                )}{" "}
                WIB
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Spin>
    </section>
  );
};

export default ContractActivitySection;
