import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { useQuery } from "@chakra-ui/react";
import { Collapse, Input, Spin, Table, Timeline, notification } from "antd";
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
  CONTRACT_LOGS_GET,
  PROJECT_NOTES_GET,
  PROJECT_NOTE_ADD,
  PROJECT_NOTE_DELETE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "lib/helper";

import { ContractService } from "apis/contract";

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

  // TODO: change constant
  const isAllowedToGetLogs = hasPermission(CONTRACT_LOGS_GET);

  // 2. useState
  const [dataRawLogs, setDataRawLogs] = useState({});
  const [dataLogs, setDataLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [searchingFilterLogs, setSearchingFilterLogs] = useState("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogs?project_id=${contractId}&keyword=${searchingFilterLogs}&page=${pageLogs}&rows=5`,
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
  }, [isAllowedToGetLogs, searchingFilterLogs, pageLogs]);

  // const { data: dataActivityLogs, isLoading: loadingActivityLogs } = useQuery(
  //   [CONTRACT_LOGS_GET],
  //   () => ContractService.getLogs(initProps, isAllowedToGetLogs, contractId),
  //   {
  //     enabled: isTabActive,
  //     refetchOnMount: false,
  //     select: (response) => response.data.data,
  //   }
  // );

  // console.log({ dataLogs });

  return (
    <section>
      <h4 className="mig-heading--4 mb-6">Aktivitas</h4>
      <Timeline>
        <Timeline.Item color="#35763B">
          <p className="text-mono50">Kontrak dibuat oleh [nama user]</p>
          <p className="mig-caption text-mono80">
            Senin, 17 Januari 2022 10:00 WIB
          </p>
        </Timeline.Item>
        <Timeline.Item color="#35763B">
          <p className="text-mono50">Kontrak dibuat oleh [nama user]</p>
          <p className="mig-caption text-mono80">
            Senin, 17 Januari 2022 10:00 WIB
          </p>
        </Timeline.Item>
      </Timeline>
    </section>
  );
};

export default ContractActivitySection;
