import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Table, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import DrawerAddAttendanceCode from "../../drawer/companies/chargecode/drawerAddAttendanceCode";
import {
  CheckBoldSvg,
  CheckIconSvg,
  CloseIconSvg,
  EditTablerIconSvg,
  PlusIconSvg,
  TrashIconSvg,
} from "../../icon";

const ModalAttendanceCode = ({ visible, onClose, initProps }) => {
  const [statusActive, setStatusActive] = useState("1");
  const [datatable, setdatatable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowstate, setrowstate] = useState(0);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [showDrawerAttendance, setShowDrawerAttendance] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [dataRawWorkDay, setDataRawWorkDay] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });

  const columnChargeCode = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawWorkDay?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Attendance Code Name",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Description",
      key: "workdays_count",
      width: 200,
      //   sorter: true,
      dataIndex: "workdays_count",
      render: (text, record, index) => {
        return {
          children: <>{text} schedules</>,
        };
      },
    },
    {
      title: "Hari Masuk",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children:
            (dataRawWorkDay?.from + index) % 2 == 0 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Penggajian",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children:
            (dataRawWorkDay?.from + index) % 2 == 0 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Dapat Ditagih",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children:
            (dataRawWorkDay?.from + index) % 2 == 0 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Action",
      key: "button_action",
      width: 50,
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-2">
              <Link href={`/company/workdayschedule/edit/${record.id}`}>
                <EditTablerIconSvg size={20} color={"#808080"} />
              </Link>

              <Link href={`/company/chargecode/${record.id}`}>
                <TrashIconSvg size={20} color={"#BF4A40"} />
              </Link>
            </div>
          ),
        };
      },
    },
  ];

  useEffect(() => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      //   if (!isAllowedToGetCompanyWorkday) {
      //     permissionWarningNotification("Mendapatkan", "Daftar Company Workday");
      //     // setloaddatatable(false);
      //     return;
      //   }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdayCompanies${payload}`,
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
            // console.log('isi datanya ',res2)
            setDataRawWorkDay(res2.data);
            setdatatable(res2.data.data);
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
        .finally(() => setLoading(false));
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    queryParams.page,
    // isAllowedToGetCompanyWorkday,
    // searchingFilterWorkingDays,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      className="modalCore"
      title={
        <p className={"text-sm/6 font-bold font-inter text-mono30"}>
          MIGHTY Attendance Code
        </p>
      }
      footer={null}
      width={950}
    >
      <div className="flex flex-col gap-3 ">
        <Table
          dataSource={datatable}
          columns={columnChargeCode}
          rowKey={(record) => record.id}
          loading={loading}
          scroll={{ x: 200 }}
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.rows,
            total: 10,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter, extra) => {
            const sortTypePayload =
              sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                ? "desc"
                : undefined;

            setQueryParams({
              sort_type: sortTypePayload,
              sort_by: sortTypePayload === undefined ? undefined : sorter.field,
              page: pagination.current,
              rows: pagination.pageSize,
            });
          }}
          onRow={(record, rowIndex) => {
            return {
              //   onMouseOver: () => {
              //     setrowstate(record.id);
              //   },
              // onClick: () => {
              //   !isBulk && setDrawerShown(true);
              //   tempIdClicked.current = record.id;
              //   setTriggerRowClicked((prev) => prev + 1);
              // },
            };
          }}
          rowClassName={(record, idx) => {
            return `${record.id === rowstate && `cursor-pointer`}
                                }`;
          }}
        />
        <div className={"flex justify-center mt-4"}>
          <div
            onClick={() => setShowDrawerAttendance(true)}
            className={
              "hover:cursor-pointer flex gap-1.5 py-2 px-4 rounded-[5px] bg-[#35763B]"
            }
          >
            <PlusCircleOutlined style={{ width: 16, color: "white" }} />
            <p className={"text-white text-sm/4 font-roboto font-medium"}>
              Add Charge Code
            </p>
          </div>
        </div>
      </div>
      <DrawerAddAttendanceCode
        visible={showDrawerAttendance}
        onvisible={setShowDrawerAttendance}
        initProps={initProps}
        isAllowedToAddCompany={true}
        setLoadingCreate={setLoadingCreate}
        loadingCreate={loadingCreate}
      />
    </Modal>
  );
};

export default ModalAttendanceCode;
