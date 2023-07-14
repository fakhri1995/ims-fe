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
  PROJECT_NOTES_GET,
  PROJECT_NOTE_ADD,
  PROJECT_NOTE_DELETE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "lib/helper";

import { ContractService } from "../../../../apis/contract/contract.service";

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
  const isAllowedToGetLogs = hasPermission(PROJECT_NOTES_GET);
  const isAllowedToAddNote = hasPermission(PROJECT_NOTE_ADD);
  const isAllowedToDeleteNote = hasPermission(PROJECT_NOTE_DELETE);

  // 2. useState

  // 3. useQuery & useEffect
  // 3.1. Get Contract Activity Logs
  // const { data: dataActivityLogs, isLoading: loadingActivityLogs } = useQuery(
  //   [CONTRACT_LOGS_GET, refresh],
  //   () =>
  //     ContractService.getNotes(
  //       initProps,
  //       isAllowedToGetLogs,
  //       contractId

  //     ),
  //   {
  //     enabled: isAllowedToGetLogs,
  //     select: (response) => response.data.data,
  //   }
  // );

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
