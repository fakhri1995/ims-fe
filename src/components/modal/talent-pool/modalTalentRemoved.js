import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@chakra-ui/react";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Table,
  Tooltip,
  notification,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { TalentPoolService } from "../../../apis/talent-pool/talent-pool.service";
import {
  TALENT_POOL_ADD,
  TALENT_POOL_CANDIDATES_GET,
} from "../../../lib/features";
import {
  getNameInitial,
  permissionWarningNotification,
} from "../../../lib/helper";
import ButtonSys from "../../button";
import {
  DeleteTablerIconSvg,
  HistoryIconSvg,
  OneUserIconSvg,
  XIconSvg,
} from "../../icon";
import { ModalUbah } from "../modalCustom";

const modalTalentRemoved = ({
  initProps,
  visible,
  onvisible,
  isAllowedToGetTalentRemoved,
  refetchList,
}) => {
  const { hasPermission } = useAccessControl();
  const [form] = Form.useForm();

  const isAllowedToGetCandidates = hasPermission(TALENT_POOL_CANDIDATES_GET);
  const isAllowedToAddTalentPool = hasPermission(TALENT_POOL_ADD);
  const [searchCandidate, setSearchCandidate] = useState("");
  // 1. USE STATE
  const [params, setParams] = useState({
    page: 1,
    rows: 10,
    category_id: 24,
  });
  const [rowState, setRowState] = useState(0);

  const [dataRawCandidates, setDataRawCandidates] = useState({
    data: [
      {
        name: "Patar sihombing",
        role: "Software Engineer",
      },
      {
        name: "Yasmin Adelia",
        role: "Software Engineer",
      },
    ],
    total: 2,
  });

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  // 3. HANDLER
  const clearData = () => {
    setSearchCandidate("");
  };
  // console.log({ dataServiceList });
  // console.log({ dataCategory });

  return (
    <Modal
      open={visible}
      closable={false}
      footer={null}
      title={
        <div className={"flex gap-4 items-center"}>
          <p className={"text-[#4D4D4D] text-[14px] font-semibold"}>
            Talents Removed
          </p>
          <div
            onClick={() => onvisible()}
            className={
              "flex justify-center items-center w-8 h-8 rounded-[100px] bg-[#FAFAFA] hover:cursor-pointer"
            }
          >
            <XIconSvg size={20} color={"#808080"} />
          </div>
        </div>
      }
    >
      <Select
        className={"w-full"}
        placeholder={"Select Role"}
        options={[
          {
            value: "Software Engineer",
            label: "Software Engineer",
          },
          {
            value: "UI/UX",
            label: "UI/UX",
          },
          {
            value: "System Engineer",
            label: "System Engineer",
          },
        ]}
      />
      <Table
        rowKey={(record) => record.id}
        className="tableTalentCandidate mt-4"
        dataSource={dataRawCandidates?.data}
        // loading={loadingCandidates}
        pagination={{
          current: params.page,
          pageSize: params.rows,
          total: dataRawCandidates?.total,
          showSizeChanger: true,
          pageSizeOptions: [10, 20],
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={(pagination, filters, sorter) => {
          setParams((prev) => ({
            ...prev,
            page: pagination.current,
            rows: pagination.pageSize,
          }));
        }}
        onRow={(record) => {
          return {
            onMouseOver: () => {
              setRowState(record.id);
            },
          };
        }}
        columns={[
          {
            title: undefined,
            dataIndex: "candidate",
            key: "candidate",
            render: (_, record, cardIdx) => {
              return (
                <div
                  className={`px-3 py-2 relative hover:bg-backdrop rounded-md flex 
                    items-center justify-between mb-2 h-[52px]  border border-[#E6E6E6] cursor-pointer bg-transparent`}
                >
                  <div className="flex gap-3 items-center w-11/12">
                    <div
                      className={`rounded-full w-8 h-8 flex justify-center 
                        items-center mig-caption--bold p-1 bg-[#35763B] bg-opacity-10`}
                    >
                      <OneUserIconSvg color={"#35763B"} strokeWidth={2} />
                    </div>
                    <div className={"flex flex-col"}>
                      <p className="text-[#4D4D4D] text-[14px] leading-6">
                        {record?.name}
                      </p>
                      <p className="text-[#808080] text-xs leading-5">
                        {record?.role}
                      </p>
                    </div>
                  </div>
                  <div className={"flex gap-3"}>
                    <Tooltip placement="top" title={"Recover Talent"}>
                      <div
                        className={
                          "rounded-[5px] bg-[#BF4A40] bg-opacity-10 w-8 h-8 flex justify-center items-center"
                        }
                      >
                        <HistoryIconSvg
                          strokeWidth={2}
                          size={16}
                          color={"#35763B"}
                        />
                      </div>
                    </Tooltip>
                    <Tooltip placement="top" title={"Delete Forever Talent"}>
                      <div
                        className={
                          "rounded-[5px] bg-[#BF4A40] bg-opacity-5 w-8 h-8 flex justify-center items-center"
                        }
                      >
                        <DeleteTablerIconSvg
                          size={16}
                          color={"#BF4A40"}
                          strokeWidth={2}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              );
            },
          },
        ]}
      />
    </Modal>
  );
};

export default modalTalentRemoved;
